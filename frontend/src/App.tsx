import React, { useState } from 'react';
import { Header } from './components/Layout/Header';
import { MessageBubble } from './components/Chat/MessageBubble';
import './styles/globals.css';
import { Message } from './types/chat';
import { sendMessage } from './services/api';

const App = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I am MediDiag AI. How can I help with your medical concerns today?',
      role: 'assistant',
      timestamp: new Date().toISOString()
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSendMessage = async () => {
    if (inputText.trim() === '' || isLoading) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputText,
      role: 'user',
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    
    try {
      // Call the actual API instead of setTimeout
      const response = await sendMessage(inputText);
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error getting response:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        role: 'assistant',
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-text">
      <Header title="MediDiag AI" />
      
      <main className="flex-1 container mx-auto p-4 max-w-4xl">
        <div className="bg-gray-50 rounded-lg shadow p-4 mb-4 h-[70vh] overflow-y-auto flex flex-col space-y-4">
          {messages.map(message => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="self-end bg-gray-200 text-gray-600 p-3 rounded-lg">
              <span className="animate-pulse">AI is thinking...</span>
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Describe your symptoms..."
            className="flex-1 p-2 border border-gray-300 rounded"
            disabled={isLoading}
          />
          <button 
            onClick={handleSendMessage}
            className="bg-primary text-white px-4 py-2 rounded"
            disabled={isLoading}
          >
            Send
          </button>
        </div>
      </main>
    </div>
  );
};

export default App;