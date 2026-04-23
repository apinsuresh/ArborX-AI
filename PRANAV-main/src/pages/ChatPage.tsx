import React from 'react';
import Chatbot from '../components/Chatbot';

export default function ChatPage() {
  return (
    <div className="max-w-5xl mx-auto h-full flex flex-col">
      <header className="flex items-end justify-between shrink-0 mb-8">
        <div>
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-on-surface-variant block mb-2">
            AI ASSISTANT
          </span>
          <h1 className="text-5xl font-display font-extrabold text-on-surface">ArborX Chat</h1>
        </div>
      </header>

      <div className="flex-1 min-h-0">
        <Chatbot />
      </div>
    </div>
  );
}
