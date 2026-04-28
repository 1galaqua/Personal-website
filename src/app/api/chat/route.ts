
import OpenAI, { APIError } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const MAX_MESSAGES = 50;
const MAX_MESSAGE_CHARS = 4000;
const MAX_TOTAL_INPUT_CHARS = 24_000;

type ClientRole = 'user' | 'assistant';

interface ClientChatMessage {
  role: ClientRole;
  content: string;
}

function parseClientMessages(raw: unknown): ClientChatMessage[] | null {
  if (!Array.isArray(raw)) return null;
  if (raw.length === 0 || raw.length > MAX_MESSAGES) return null;

  let totalChars = 0;
  const out: ClientChatMessage[] = [];

  for (const m of raw) {
    if (m === null || typeof m !== 'object') return null;
    const obj = m as Record<string, unknown>;
    const role = obj.role;
    const content = obj.content;
    if (role !== 'user' && role !== 'assistant') return null;
    if (typeof content !== 'string') return null;

    const trimmed = content.trim();
    if (!trimmed || trimmed.length > MAX_MESSAGE_CHARS) return null;
    totalChars += trimmed.length;
    if (totalChars > MAX_TOTAL_INPUT_CHARS) return null;

    out.push({ role, content: trimmed });
  }

  return out;
}

export async function POST(req: Request) {
  const apiKeyMissing = !process.env.OPENAI_API_KEY?.trim();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const rawMessages =
    body && typeof body === 'object' && 'messages' in body
      ? (body as { messages: unknown }).messages
      : undefined;

  const messages = parseClientMessages(rawMessages);
  if (!messages) {
    return NextResponse.json(
      {
        error: `Invalid messages: expected ≤${MAX_MESSAGES} items with roles user or assistant and non-empty content (≤${MAX_MESSAGE_CHARS} characters each).`,
      },
      { status: 400 },
    );
  }

  if (apiKeyMissing) {
    return NextResponse.json({ error: 'Chat service not configured.' }, { status: 503 });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are Gal Bot, the AI twin of Gal Aqua, a Software Engineer & bachlor of computer science. 
          Your goal is to help users navigate Gal's personal portfolio, find specific projects, and explain the AIDD (AI-Driven Development) methodology.

          ### Identity & Tone:
          - Professional but accessible: Use a direct, engineering-focused tone.
          - Expertise: UI Architecture, Accessibility (a11y), and AI-first workflows.
          - Systematic: You advocate for the 12-step workflow and moving beyond "Vibe Coding".

          ### Guidelines:
          1. Be concise. 
          2. Highlight Gal's focus on "raising quality bars".
          3. For coding problems, suggest: Plan -> Context -> Build -> Verify.
           When relevant, connect answers to real-world engineering trade-offs.
          4. Avoid buzzwords unless they add real value.
          5. Respond in the user's language (Hebrew/English).`,
        },
        ...messages,
      ],
    });

    const message = response.choices[0]?.message;
    if (!message?.content) {
      return NextResponse.json({ error: 'No completion' }, { status: 502 });
    }

    return NextResponse.json({
      role: 'assistant' as const,
      content: message.content,
    });
  } catch (err: unknown) {
    if (err instanceof APIError) {
      if (err.status === 429) {
        return NextResponse.json(
          { error: 'Rate limited. Please try again in a moment.' },
          { status: 429 },
        );
      }
      if (err.status === 401) {
        return NextResponse.json(
          { error: 'Chat service misconfigured (invalid API key).' },
          { status: 503 },
        );
      }
      if (err.status === 503) {
        return NextResponse.json(
          { error: 'Chat provider temporarily unavailable.' },
          { status: 503 },
        );
      }
    }

    return NextResponse.json(
      { error: 'Chat temporarily unavailable. Try again later.' },
      { status: 500 },
    );
  }
}
