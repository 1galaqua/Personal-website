import OpenAI, { APIError, AuthenticationError, RateLimitError } from 'openai';
import { NextResponse } from 'next/server';

const MAX_MESSAGES = 24;
const MAX_CONTENT_LENGTH = 8000;

function normalizeMessages(input: unknown) {
  if (!Array.isArray(input)) return null;
  const out: OpenAI.Chat.ChatCompletionMessageParam[] = [];
  for (const item of input) {
    if (item === null || typeof item !== 'object') continue;
    const role = (item as { role?: unknown }).role;
    const content = (item as { content?: unknown }).content;
    if (role !== 'user' && role !== 'assistant') continue;
    if (typeof content !== 'string') continue;
    const trimmed = content.trim();
    if (!trimmed) continue;
    out.push({
      role,
      content: trimmed.slice(0, MAX_CONTENT_LENGTH),
    });
    if (out.length >= MAX_MESSAGES) break;
  }
  return out.length > 0 ? out.slice(-MAX_MESSAGES) : null;
}

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    console.error('[api/chat] OPENAI_API_KEY is missing');
    return NextResponse.json(
      {
        error:
          'Chat is not configured. Add OPENAI_API_KEY to .env.local and restart the dev server.',
      },
      { status: 503 },
    );
  }

  const openai = new OpenAI({ apiKey });

  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
    }

    const messages = normalizeMessages(
      body && typeof body === 'object' && 'messages' in body
        ? (body as { messages: unknown }).messages
        : null,
    );
    if (!messages) {
      return NextResponse.json(
        { error: 'Send a non-empty messages array with role "user" or "assistant".' },
        { status: 400 },
      );
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are Gal Bot, the AI assistant for Gal Aqua’s portfolio.

Your role is to help visitors quickly understand Gal’s work, explore projects, and answer questions about his skills, experience, and approach to software development.

### Identity & Tone:
- Professional and direct: Communicate like an engineer.
- Concise and helpful: Visitors should get value fast.
- Confident but grounded: No exaggeration or buzzwords.

### About Gal:
- Computer Science graduate
- Backend-oriented developer
- Focused on building scalable systems and clean architectures
- Interested in AI-assisted development workflows used in a practical way

### What You Do:
- Guide users to relevant projects based on their interest
- Explain technical decisions in simple, clear terms
- Summarize projects with focus on impact and architecture
- Answer questions about technologies, tools, and development approach

### Communication Style:
- Keep answers short and structured
- Use bullet points when helpful
- Avoid unnecessary jargon
- Explain "why" behind decisions, not just "what"
- Respond in the user's language (Hebrew/English).


### When Asked About Projects:
Always include:
- What the project does
- Key technologies used
- The main challenge or problem solved
- Any interesting architectural or technical decisions

### Engineering Approach:
Promote a clear workflow:
Plan → Break down → Build → Verify

Emphasize:
- Code quality
- Maintainability
- Real-world trade-offs
- Practical use of AI tools (not hype)

### Boundaries:
- If something isn’t in the portfolio, say you don’t have that info
- Don’t invent experience or projects
- Keep responses aligned with a junior-to-mid backend developer level
- Respond in the user's language (Hebrew/English).
### Goal:
Help visitors quickly understand Gal’s strengths and make a strong, credible impression.`,
        },
        ...messages,
      ],
    });

    const message = response.choices[0]?.message;
    if (!message?.content) {
      return NextResponse.json({ error: 'No completion from model.' }, { status: 502 });
    }

    return NextResponse.json({
      role: 'assistant' as const,
      content: message.content,
    });
  } catch (err) {
    console.error('[api/chat]', err);

    if (err instanceof RateLimitError || (err instanceof APIError && err.status === 429)) {
      return NextResponse.json(
        {
          error:
            'AI usage limit reached (OpenAI quota or billing). Try again later. Site owner: check Usage & billing at platform.openai.com.',
        },
        { status: 429 },
      );
    }

    if (err instanceof AuthenticationError) {
      return NextResponse.json(
        {
          error:
            'Invalid OpenAI API key. Set OPENAI_API_KEY in .env.local (local) or Vercel env, then restart / redeploy.',
        },
        { status: 401 },
      );
    }

    const isDev = process.env.NODE_ENV === 'development';
    const msg =
      err instanceof Error
        ? err.message
        : 'Unexpected error calling the language model.';
    return NextResponse.json(
      {
        error: isDev
          ? msg
          : 'Chat temporarily unavailable. Please try again later.',
      },
      { status: 500 },
    );
  }
}
