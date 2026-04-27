
import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

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
          5. Respond in the user's language (Hebrew/English).` 
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
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}