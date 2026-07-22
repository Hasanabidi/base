import { useCallback, useEffect, useId, useState } from 'react';
import { X, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  CHAT_WIDGET_MODE,
  getWhatsAppUrl,
  WHATSAPP_CONFIG,
} from '@/config/chatWidget';
import ChatbotPanel from './ChatbotPanel';

const WhatsAppIcon = ({ size = 24, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

/**
 * Fixed bottom-right contact widget with dual mode: WhatsApp + AI Chatbot.
 */
export default function FloatingChatWidget() {
  const [mounted, setMounted] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('whatsapp'); // 'whatsapp' or 'chatbot'
  const panelId = useId();
  const labelId = useId();

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const openWhatsApp = useCallback(() => {
    window.open(getWhatsAppUrl(), '_blank', 'noopener,noreferrer');
    setPanelOpen(false);
  }, []);

  const togglePanel = useCallback(() => {
    setPanelOpen((open) => !open);
    if (!panelOpen) setActiveTab('whatsapp');
  }, [panelOpen]);

  const handlePrimaryAction = useCallback(() => {
    if (CHAT_WIDGET_MODE === 'whatsapp') {
      openWhatsApp();
      return;
    }
    togglePanel();
  }, [openWhatsApp, togglePanel]);

  return (
    <div
      className={cn(
        'pointer-events-none fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3',
        'max-[480px]:bottom-4 max-[480px]:right-4'
      )}
      aria-hidden={false}
    >
      {/* Expandable panel */}
      <div
        id={panelId}
        role="dialog"
        aria-labelledby={labelId}
        aria-hidden={!panelOpen}
        className={cn(
          'pointer-events-auto w-[min(100vw-2rem,22rem)] origin-bottom-right rounded-2xl border border-slate-200 bg-white p-0 shadow-premium transition-all duration-300 dark:border-slate-700 dark:bg-slate-900',
          panelOpen
            ? 'translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none translate-y-2 scale-95 opacity-0'
        )}
      >
        {/* Tab Header */}
        {CHAT_WIDGET_MODE === 'dual' && (
          <div className="flex border-b border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setActiveTab('whatsapp')}
              className={cn(
                'flex-1 py-3 text-sm font-semibold transition-colors',
                activeTab === 'whatsapp'
                  ? 'bg-[#25D366]/10 text-[#25D366] border-b-2 border-[#25D366]'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              )}
              aria-selected={activeTab === 'whatsapp'}
              role="tab"
            >
              <span className="flex items-center justify-center gap-2">
                <WhatsAppIcon size={16} />
                WhatsApp
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('chatbot')}
              className={cn(
                'flex-1 py-3 text-sm font-semibold transition-colors',
                activeTab === 'chatbot'
                  ? 'bg-indigo-600/10 text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              )}
              aria-selected={activeTab === 'chatbot'}
              role="tab"
            >
              <span className="flex items-center justify-center gap-2">
                <MessageCircle size={16} />
                AI Chat
              </span>
            </button>
          </div>
        )}

        {/* Panel Content */}
        <div className="p-5">
          {activeTab === 'whatsapp' ? (
            <>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p id={labelId} className="font-heading text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">
                    Chat on WhatsApp
                  </p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    Get a reply typically within a few hours.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPanelOpen(false)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                  aria-label="Close chat panel"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              </div>
              <button
                type="button"
                onClick={openWhatsApp}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
              >
                <WhatsAppIcon size={18} aria-hidden="true" />
                Open WhatsApp
              </button>
            </>
          ) : (
            <ChatbotPanel onClose={() => setPanelOpen(false)} />
          )}
        </div>
      </div>

      {/* Primary FAB */}
      <button
        type="button"
        onClick={handlePrimaryAction}
        aria-label={
          panelOpen
            ? 'Close chat widget'
            : 'Open chat widget'
        }
        aria-expanded={panelOpen}
        aria-controls={panelId}
        className={cn(
          'pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full',
          'bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-glow-lg',
          'transition-all duration-500 ease-out',
          'hover:scale-105 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2',
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        )}
        style={{ willChange: 'transform, opacity' }}
      >
        {panelOpen ? (
          <X size={22} aria-hidden="true" />
        ) : (
          <WhatsAppIcon size={26} aria-hidden="true" />
        )}
      </button>

      {/* Screen-reader hint */}
      <span className="sr-only">
        {activeTab === 'whatsapp' 
          ? `WhatsApp pre-filled message: ${WHATSAPP_CONFIG.defaultMessage}`
          : 'AI Chatbot - Type your message to get instant assistance'
        }
      </span>
    </div>
  );
}
