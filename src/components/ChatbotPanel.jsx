import { useCallback, useEffect, useRef, useState } from 'react';
import { Send, X, Loader2, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CHATBOT_CONFIG } from '@/config/chatWidget';

/**
 * ChatbotPanel — AI tab content for the unified FloatingChatWidget.
 * Talks to /api/chat (Groq, streaming) — same backend and streaming
 * logic as the old standalone AIChatWidget.
 */

const API_ENDPOINT = '/api/chat';

const WELCOME_ID = 'welcome';

/** Parse raw OpenAI-format SSE stream chunks and extract delta text. */
function parseSSEChunk(raw) {
  const lines = raw.split('\n').filter(Boolean);
  let text = '';
  for (const line of lines) {
    if (!line.startsWith('data: ')) continue;
    const data = line.slice(6).trim();
    if (data === '[DONE]') break;
    try {
      const parsed = JSON.parse(data);
      const delta = parsed.choices?.[0]?.delta?.content;
      if (delta) text += delta;
    } catch {
      // skip malformed chunks
    }
  }
  return text;
}

/** Very simple markdown renderer — bold, inline code, line breaks only. */
function renderMarkdown(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code class="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-xs font-mono">$1</code>')
    .replace(/\n/g, '<br>');
}

export default function ChatbotPanel({ onClose }) {
  const [messages, setMessages] = useState([
    { id: WELCOME_ID, role: 'assistant', content: CHATBOT_CONFIG.welcomeMessage },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Cancel any in-flight stream if the panel unmounts (e.g. tab switch)
  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const text = inputValue.trim();
      if (!text || isLoading) return;

      setInputValue('');
      setError(null);

      const userMsg = { id: Date.now().toString(), role: 'user', content: text };
      const assistantId = (Date.now() + 1).toString();

      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);
      // Seed empty assistant message to stream into
      setMessages((prev) => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

      const ctrl = new AbortController();
      abortRef.current = ctrl;

      try {
        const history = messages
          .filter((m) => m.id !== WELCOME_ID)
          .map(({ role, content }) => ({ role, content }));

        const res = await fetch(API_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: [...history, { role: 'user', content: text }] }),
          signal: ctrl.signal,
        });

        if (!res.ok) {
          const errJson = await res.json().catch(() => ({}));
          throw new Error(errJson.error || `HTTP ${res.status}`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          const parts = buffer.split('\n\n');
          buffer = parts.pop() ?? '';

          for (const part of parts) {
            const delta = parseSSEChunk(part + '\n\n');
            if (delta) {
              setMessages((prev) =>
                prev.map((m) => (m.id === assistantId ? { ...m, content: m.content + delta } : m))
              );
            }
          }
        }

        if (buffer) {
          const delta = parseSSEChunk(buffer);
          if (delta) {
            setMessages((prev) =>
              prev.map((m) => (m.id === assistantId ? { ...m, content: m.content + delta } : m))
            );
          }
        }
      } catch (err) {
        if (err.name === 'AbortError') return;
        console.error('Chat error:', err);
        setError('Sorry, I encountered an error. Please try again or use WhatsApp for human support.');
        setMessages((prev) => prev.filter((m) => m.id !== assistantId));
      } finally {
        setIsLoading(false);
      }
    },
    [inputValue, isLoading, messages]
  );

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
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex max-w-[85%] gap-2',
              message.role === 'user' ? 'ml-auto flex-row-reverse' : 'flex-row'
            )}
          >
            {message.role === 'assistant' && (
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white">
                <Bot size={12} />
              </div>
            )}
            <div
              className={cn(
                'rounded-2xl px-4 py-2 text-sm leading-relaxed',
                message.role === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100'
              )}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }}
            />
          </div>
        ))}
        {isLoading && (
          <div className="flex max-w-[85%] gap-2">
            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white">
              <Bot size={12} />
            </div>
            <div className="rounded-2xl bg-slate-100 px-4 py-2 text-slate-900 dark:bg-slate-800 dark:text-slate-100">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          </div>
        )}
        {error && (
          <p className="text-center text-xs text-red-500 dark:text-red-400">⚠️ {error}</p>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick action chips — only before the conversation starts */}
      {messages.length <= 1 && !isLoading && (
        <div className="flex flex-wrap gap-1.5 px-4 pb-1">
          {['What services do you offer?', 'Book a consultation', 'How much does it cost?'].map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => setInputValue(q)}
              className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs text-indigo-700 transition-colors hover:bg-indigo-100 dark:border-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-300 dark:hover:bg-indigo-900/50"
            >
              {q}
            </button>
          ))}
        </div>
      )}

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
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
      </form>
    </div>
  );
}