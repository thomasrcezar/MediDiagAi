import React, { useState } from 'react';
import { Header } from './components/Layout/Header';
import { MessageBubble } from './components/Chat/MessageBubble';
import './styles/globals.css';
import { Message } from './types/chat';

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
  
  const handleSendMessage = () => {
    if (inputText.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputText,
      role: 'user',
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    
    // Simulate AI response (replace with actual API call later)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: 'I need more information about your symptoms to provide an assessment. Could you describe what you\'re experiencing?',
        role: 'assistant',
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-text">
      <Header title="MediDiag AI" />
      
      <main className="flex-1 container mx-auto p-4 max-w-4xl">
        <div className="bg-gray-50 rounded-lg shadow p-4 mb-4 h-[70vh] overflow-y-auto flex flex-col space-y-4">
          {messages.map(message => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Describe your symptoms..."
            className="flex-1 p-2 border border-gray-300 rounded"
          />
          <button 
            onClick={handleSendMessage}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      </main>
    </div>
  );
};

export default App;