'use client';

// --- 1. IMPORT useRef AND useEffect ---
import { useState, useRef, useEffect } from 'react';
import {
  ChatBubbleOvalLeftEllipsisIcon,
  XMarkIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/solid';

// Define the structure for a message
interface Message {
  role: 'user' | 'assistant';
  text: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // --- 2. CREATE A REF FOR THE CHAT CONTAINER ---
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: 'Welcome! How can I assist you today?',
    },
  ]);

  // --- 3. ADD useEffect TO SCROLL ON NEW MESSAGES ---
  useEffect(() => {
    if (chatContainerRef.current) {
      // Scroll to the bottom
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]); // This effect runs every time the 'messages' array changes
  // --------------------------------------------------

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage: Message = { role: 'user', text: input };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setIsTyping(true);
    setInput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages.map(msg => ({
            role: msg.role,
            content: msg.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const aiMessage: Message = { role: 'assistant', text: data.reply };
      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {
      console.error('Failed to get AI response:', error);
      const errorMessage: Message = {
        role: 'assistant',
        text: 'Sorry, I am having trouble connecting. Please try again later.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };
  
  return (
    // --- RESPONSIVE CHANGE 1 ---
    // On mobile, the container is 1rem from the edges.
    // On sm screens, it's fixed to the bottom-right.
    <div className="fixed z-50 bottom-4 right-4 left-4 sm:left-auto">
      {/* Chat Window */}
      {isOpen && (
        // --- RESPONSIVE CHANGE 2 ---
        // On mobile, width is full and height is 80vh.
        // On sm screens, it snaps to your 30rem x 35rem size.
        <div className="flex h-[80vh] w-full flex-col rounded-lg bg-white shadow-xl sm:h-[35rem] sm:w-[30rem]">
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-lg bg-blue-600 p-3 text-white">
            <h3 className="text-lg font-semibold">ASK ME</h3>
            <button
              onClick={toggleChat}
              className="rounded-full p-1 transition-colors hover:bg-blue-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* --- 4. ATTACH THE REF TO THE MESSAGE AREA --- */}
          <div 
            ref={chatContainerRef}
            className="flex-grow space-y-3 overflow-y-auto p-4"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                } ${
                  index === 0 ? 'animate-slide-in-left' : ''
                }`}
              >
                <div
                  className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${
                    msg.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[75%] rounded-lg bg-gray-200 px-4 py-3">
                  <div className="flex items-center justify-center space-x-1">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.3s]"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500"></div>
                  </div>
                </div>
              </div>
            )}
            
          </div>
          {/* ------------------------------------------- */}

          {/* Input Area */}
          <div className="flex gap-2 border-t border-gray-200 p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-grow rounded-full border px-4 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={handleSend}
              className="flex items-center justify-center rounded-full bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      {!isOpen && (
        // Position the button at the bottom right of its container
        <button
          onClick={toggleChat}
          className="ml-auto flex items-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-lg font-semibold text-white shadow-lg transition-transform hover:scale-105"
        >
          <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
          ASK ME
        </button>
      )}
    </div>
  );
}