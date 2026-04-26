import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are Gal Bot, a helpful AI expert assistant.' },
        ...messages,
      ],
    });

    const message = response.choices[0]?.message;
    return NextResponse.json(message ?? { error: 'No completion' });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
