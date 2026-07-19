import { useCallback, useEffect, useId, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  CHAT_WIDGET_MODE,
  getWhatsAppUrl,
  WHATSAPP_CONFIG,
} from '@/config/chatWidget';

/**
 * Fixed bottom-right contact widget.
 * Mode is controlled by chatWidget config — swap to chatbot SDK without layout changes.
 */
export default function FloatingChatWidget() {
  const [mounted, setMounted] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
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
  }, []);

  const handlePrimaryAction = useCallback(() => {
    if (CHAT_WIDGET_MODE === 'whatsapp') {
      openWhatsApp();
      return;
    }
    setPanelOpen(true);
  }, [openWhatsApp]);

  return (
    <div
      className={cn(
        'pointer-events-none fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3',
        'max-[480px]:bottom-4 max-[480px]:right-4'
      )}
      aria-hidden={false}
    >
      {/* Expandable panel — hidden from AT until opened */}
      <div
        id={panelId}
        role="dialog"
        aria-labelledby={labelId}
        aria-hidden={!panelOpen}
        className={cn(
          'pointer-events-auto w-[min(100vw-2rem,20rem)] origin-bottom-right rounded-2xl border border-slate-200 bg-white p-5 shadow-premium transition-all duration-300 dark:border-slate-700 dark:bg-slate-900',
          panelOpen
            ? 'translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none translate-y-2 scale-95 opacity-0'
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p id={labelId} className="font-heading text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">
              Chat with us
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Get a reply on WhatsApp — typically within a few hours.
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
          Open WhatsApp
        </button>
      </div>

      {/* Primary FAB — always in tab order */}
      <button
        type="button"
        onClick={CHAT_WIDGET_MODE === 'whatsapp' && !panelOpen ? handlePrimaryAction : togglePanel}
        aria-label={
          CHAT_WIDGET_MODE === 'whatsapp'
            ? 'Chat with Fulcrum System on WhatsApp'
            : panelOpen
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
          <MessageCircle size={22} aria-hidden="true" />
        )}
      </button>

      {/* Screen-reader hint for WhatsApp deep link */}
      <span className="sr-only">
        WhatsApp pre-filled message: {WHATSAPP_CONFIG.defaultMessage}
      </span>
    </div>
  );
}
