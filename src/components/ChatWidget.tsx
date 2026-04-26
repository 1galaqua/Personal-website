'use client';
import { useState } from 'react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="fixed bottom-6 right-6 z-50" role="complementary" aria-label="AI Chatbot">
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-transform active:scale-95"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 h-96 bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <header className="bg-blue-600 p-4 text-white font-bold">Gal Bot</header>
          <div className="flex-1 p-4 overflow-y-auto text-sm text-gray-600">
            Hi! I'm Gal's bot. How can I help you?
       
          </div>
          <footer className="p-4 border-t border-gray-100">
            <input
              type="text"
              placeholder="Ask me something..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </footer>
        </div>
      )}
    </section>
  );
}
