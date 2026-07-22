import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { X, Send, Bot, Loader2, ChevronDown, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * AIChatWidget — Floating AI assistant powered by /api/chat (OpenAI streaming).
 * Positioned above the WhatsApp FloatingChatWidget (bottom-right corner).
 *
 * Design: mirrors the site's brand tokens (accent = indigo/violet gradient,
 * cards = border-slate-200 / bg-white / dark:bg-slate-900).
 */

const API_ENDPOINT = '/api/chat';

const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hi! I'm **Fulcrum AI**. Ask me anything about our services — Web Development, AI Automation, Custom SaaS — or I can help you book a free 15-minute consultation. How can I help?",
};

/** Parse raw OpenAI SSE stream chunks and extract delta text. */
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

/** Very simple markdown renderer — bold, code, line breaks only. */
function renderMarkdown(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code class="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-xs font-mono">$1</code>')
    .replace(/\n/g, '<br>');
}

function MessageBubble({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <div
      className={cn(
        'flex gap-2 text-sm',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {!isUser && (
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-sm">
          <Bot size={14} />
        </div>
      )}
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed',
          isUser
            ? 'rounded-tr-sm bg-gradient-to-br from-indigo-600 to-violet-600 text-white'
            : 'rounded-tl-sm border border-slate-200 bg-white text-slate-800 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100'
        )}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
      />
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-2 text-sm">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-sm">
        <Bot size={14} />
      </div>
      <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        {[0, 150, 300].map((delay) => (
          <span
            key={delay}
            className="h-1.5 w-1.5 rounded-full bg-indigo-500"
            style={{ animation: `chatBounce 0.9s ${delay}ms ease-in-out infinite` }}
          />
        ))}
      </div>
    </div>
  );
}

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState(null);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);
  const panelId = useId();

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streaming]);

  // Focus input when panel opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 200);
    } else {
      // Cancel any ongoing stream if panel is closed
      abortRef.current?.abort();
    }
  }, [open]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || streaming) return;

    setInput('');
    setError(null);

    const userMsg = { id: Date.now().toString(), role: 'user', content: text };
    const assistantId = (Date.now() + 1).toString();

    setMessages((prev) => [...prev, userMsg]);
    setStreaming(true);

    // Seed assistant message for streaming
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: 'assistant', content: '' },
    ]);

    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      const history = messages
        .filter((m) => m.id !== 'welcome')
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

        // Process complete SSE lines
        const parts = buffer.split('\n\n');
        buffer = parts.pop() ?? '';

        for (const part of parts) {
          const delta = parseSSEChunk(part + '\n\n');
          if (delta) {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId
                  ? { ...m, content: m.content + delta }
                  : m
              )
            );
          }
        }
      }

      // Flush any remaining buffer
      if (buffer) {
        const delta = parseSSEChunk(buffer);
        if (delta) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? { ...m, content: m.content + delta }
                : m
            )
          );
        }
      }
    } catch (err) {
      if (err.name === 'AbortError') return;
      console.error('Chat error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
      // Remove empty assistant placeholder
      setMessages((prev) => prev.filter((m) => m.id !== assistantId));
    } finally {
      setStreaming(false);
    }
  }, [input, streaming, messages]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage]
  );

  return (
    <>
      {/* Bounce animation keyframes injected once */}
      <style>{`
        @keyframes chatBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
      `}</style>

      <div className="pointer-events-none fixed bottom-[5.5rem] right-6 z-[91] flex flex-col items-end gap-3 max-[480px]:right-4">
        {/* Chat panel */}
        <div
          id={panelId}
          role="dialog"
          aria-label="Fulcrum AI assistant"
          aria-hidden={!open}
          className={cn(
            'pointer-events-auto flex w-[min(100vw-2rem,22rem)] flex-col overflow-hidden',
            'rounded-2xl border border-slate-200 bg-white shadow-premium',
            'dark:border-slate-700 dark:bg-slate-900',
            'transition-all duration-300 ease-out origin-bottom-right',
            open
              ? 'translate-y-0 scale-100 opacity-100'
              : 'pointer-events-none translate-y-3 scale-95 opacity-0'
          )}
          style={{ height: open ? 'min(520px, 70vh)' : 0 }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-slate-100 bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 dark:border-slate-800">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <Sparkles size={16} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-heading text-xs font-bold uppercase tracking-wider text-white">
                Fulcrum AI
              </p>
              <p className="text-[10px] text-indigo-200">Online · Online · Powered by Gemini 2.0 Flash</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close AI chat"
            >
              <ChevronDown size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-4 scroll-smooth">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} msg={msg} />
            ))}
            {streaming && <TypingIndicator />}
            {error && (
              <p className="text-center text-xs text-red-500 dark:text-red-400">
                ⚠️ {error}
              </p>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick action chips */}
          {messages.length <= 1 && !streaming && (
            <div className="flex flex-wrap gap-1.5 px-4 pb-2">
              {[
                'What services do you offer?',
                'Book a consultation',
                'How much does it cost?',
              ].map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => {
                    setInput(q);
                    setTimeout(() => inputRef.current?.focus(), 50);
                  }}
                  className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs text-indigo-700 transition-colors hover:bg-indigo-100 dark:border-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-300 dark:hover:bg-indigo-900/50"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input bar */}
          <div className="border-t border-slate-100 px-3 py-3 dark:border-slate-800">
            <div className="flex items-end gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 transition-all">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything…"
                rows={1}
                disabled={streaming}
                className="flex-1 resize-none bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none disabled:opacity-60 dark:text-white dark:placeholder-slate-500"
                style={{ maxHeight: '5rem' }}
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={!input.trim() || streaming}
                aria-label="Send message"
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all',
                  input.trim() && !streaming
                    ? 'bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-sm hover:shadow-md hover:-translate-y-0.5'
                    : 'bg-slate-200 text-slate-400 dark:bg-slate-700 dark:text-slate-500'
                )}
              >
                {streaming ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <Send size={15} />
                )}
              </button>
            </div>
            <p className="mt-1.5 text-center text-[10px] text-slate-400 dark:text-slate-600">
              AI can make mistakes · Always verify important info
            </p>
          </div>
        </div>

        {/* FAB toggle button */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close AI chat' : 'Chat with Fulcrum AI'}
          aria-expanded={open}
          aria-controls={panelId}
          className={cn(
            'pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full',
            'bg-gradient-to-br from-indigo-600 to-violet-600 text-white',
            'shadow-lg shadow-indigo-500/30 transition-all duration-300',
            'hover:scale-110 hover:shadow-xl hover:shadow-indigo-500/40',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2'
          )}
        >
          {open ? (
            <X size={20} className="transition-transform duration-200" />
          ) : (
            <Sparkles size={20} className="transition-transform duration-200" />
          )}
        </button>
      </div>
    </>
  );
}
