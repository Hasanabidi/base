import { useState, useRef, useEffect } from 'react';
import { Send, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CHATBOT_CONFIG } from '@/config/chatWidget';

export default function ChatbotPanel({ onClose }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: CHATBOT_CONFIG.welcomeMessage }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(CHATBOT_CONFIG.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage,
          history: messages.slice(-10) // Last 10 messages for context
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      } else {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error. Please try again or use WhatsApp for human support.' 
        }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I\'m having trouble connecting. Please try again or use WhatsApp for human support.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[500px] flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-700">
        <div>
          <p className="font-heading text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">
            {CHATBOT_CONFIG.botName}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {CHATBOT_CONFIG.disclaimer}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
          aria-label="Close chatbot"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              'flex max-w-[85%]',
              message.role === 'user' ? 'ml-auto justify-end' : ''
            )}
          >
            <div
              className={cn(
                'rounded-2xl px-4 py-2 text-sm',
                message.role === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100'
              )}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex max-w-[85%]">
            <div className="rounded-2xl bg-slate-100 px-4 py-2 text-slate-900 dark:bg-slate-800 dark:text-slate-100">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="border-t border-slate-200 p-4 dark:border-slate-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            aria-label="Chat message input"
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white transition-colors hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            aria-label="Send message"
          >
            {isLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
