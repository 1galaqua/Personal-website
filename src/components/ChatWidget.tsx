'use client';

import { useState, type FormEvent } from 'react';

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
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Network error. Try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="fixed bottom-6 right-6 z-50" role="complementary" aria-label="AI Chatbot">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full bg-blue-600 p-4 text-white shadow-lg transition-transform hover:bg-blue-700 active:scale-95"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 flex h-96 w-80 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white font-sans shadow-2xl dark:border-zinc-700 dark:bg-zinc-900">
          <header className="bg-blue-600 p-4 font-bold text-white">Gal Bot</header>
          <div className="flex-1 space-y-4 overflow-y-auto p-4 text-sm">
            {messages.length === 0 && (
              <p className="text-gray-500 dark:text-zinc-400">
                Hi! Ask about Gal&apos;s projects and experience.
              </p>
            )}
            {messages.map((m, i) => (
              <div
                key={`${i}-${m.role}-${m.content.slice(0, 24)}`}
                className={`max-w-[80%] rounded-lg p-2 ${
                  m.role === 'user'
                    ? 'ml-auto bg-blue-100 text-gray-900 dark:bg-blue-950/50 dark:text-zinc-100'
                    : 'mr-auto bg-gray-100 text-gray-900 dark:bg-zinc-800 dark:text-zinc-100'
                }`}
              >
                {m.content}
              </div>
            ))}
            {isLoading && (
              <div className="text-xs italic text-gray-400 dark:text-zinc-500">Thinking...</div>
            )}
          </div>
          <form onSubmit={sendMessage} className="border-t border-gray-100 p-4 dark:border-zinc-700">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me something..."
              disabled={isLoading}
              autoComplete="off"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
            />
          </form>
        </div>
      )}
    </section>
  );
}
