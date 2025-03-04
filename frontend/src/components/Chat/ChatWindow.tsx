// src/components/Chat/ChatWindow.tsx
import React, { useRef, useEffect } from 'react';
import { Message } from '../../types/chat';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { useChat } from '../../hooks/useChat';

export const ChatWindow: React.FC = () => {
  const { messages, isLoading, error, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
        {error && (
          <div className="text-red-500 text-center p-2">{error}</div>
        )}
      </div>
      <ChatInput onSend={sendMessage} isLoading={isLoading} />
    </div>
  );
};
