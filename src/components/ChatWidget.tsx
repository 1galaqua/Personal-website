'use client';

import Image from 'next/image';
import { useState, useEffect, useRef, type FormEvent } from 'react';

type ChatRole = 'user' | 'assistant';

interface ChatMessage {
  role: ChatRole;
  content: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input.trim() };
    const historyForApi = [...messages, userMessage];

    setMessages(historyForApi);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: historyForApi.map(({ role, content }) => ({ role, content })),
        }),
      });

      const data: unknown = await response.json();

      if (!response.ok || (data && typeof data === 'object' && 'error' in data)) {
        const err =
          data && typeof data === 'object' && 'error' in data
            ? String((data as { error: unknown }).error)
            : 'Request failed';
        setMessages((prev) => [...prev, { role: 'assistant', content: err }]);
        return;
      }

      const msg = data as { role?: string; content?: string | null };
      const content =
        typeof msg.content === 'string' && msg.content.length > 0
          ? msg.content
          : '(No reply)';

      setMessages((prev) => [...prev, { role: 'assistant', content }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Network error. Try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className="fixed bottom-6 right-6 z-50"
      role="complementary"
      aria-label="AI Assistant"
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative h-14 w-14 overflow-hidden rounded-full shadow-lg outline-none ring-2 ring-blue-500/40 transition-all hover:ring-blue-500/70 focus:ring-4 focus:ring-blue-300 dark:ring-blue-400/35 dark:hover:ring-blue-400/60 dark:focus:ring-blue-800"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={isOpen ? 'Close chat' : 'Open chat with Gal Bot'}
      >
        <Image
          src="/projects/chatbot.png"
          alt=""
          fill
          sizes="56px"
          className="object-cover"
          priority
        />
        {isOpen ? (
          <span
            className="absolute inset-0 flex items-center justify-center bg-zinc-900/55 text-lg font-light text-white"
            aria-hidden
          >
            ✕
          </span>
        ) : null}
      </button>

      {isOpen && (
        <div
          className="absolute bottom-20 right-0 flex h-96 w-80 flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl focus-within:ring-2 focus-within:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-900"
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-widget-title"
        >
          <header className="flex items-center justify-between bg-blue-600 p-4 font-bold text-white dark:bg-blue-700">
            <h2 id="chat-widget-title">Gal Bot</h2>
          </header>

          <div
            className="flex-1 space-y-4 overflow-y-auto p-4 text-sm"
            aria-live="polite"
          >
            {messages.length === 0 && (
              <p className="text-zinc-600 dark:text-zinc-300">
                Hi! Ask about projects and experience.
              </p>
            )}
            {messages.map((m, i) => (
              <div
                key={`${i}-${m.role}-${m.content.slice(0, 24)}`}
                className={`max-w-[85%] rounded-lg p-3 text-zinc-900 dark:text-zinc-100 ${
                  m.role === 'user'
                    ? 'ml-auto bg-blue-100 dark:bg-blue-950 dark:ring-1 dark:ring-blue-800'
                    : 'mr-auto bg-zinc-100 dark:bg-zinc-800 dark:ring-1 dark:ring-zinc-700'
                }`}
              >
                <span className="sr-only">{m.role === 'user' ? 'You: ' : 'Gal Bot: '}</span>
                {m.content}
              </div>
            ))}
            {isLoading && (
              <p className="text-xs italic text-zinc-500 dark:text-zinc-400">Thinking...</p>
            )}
          </div>

          <form
            onSubmit={sendMessage}
            className="flex gap-2 border-t border-zinc-200 p-4 dark:border-zinc-600"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me something..."
              disabled={isLoading}
              autoComplete="off"
              aria-label="Message to the chatbot"
              className="min-w-0 flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-400"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="shrink-0 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus:ring-offset-zinc-900"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </section>
  );
}
