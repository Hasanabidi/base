import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cookie } from 'lucide-react';

const STORAGE_KEY = 'fulcrum-cookie-consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const decide = (choice) => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* storage unavailable — dismiss for this session anyway */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6">
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-premium sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-transparent bg-gradient-to-br from-indigo-500 to-violet-600">
            <Cookie size={16} className="text-white" />
          </div>
          <p className="text-sm leading-relaxed text-text-secondary">
            We use cookies to keep the site running, remember your preferences, and understand
            usage. See our{' '}
            <Link to="/cookies" className="font-medium text-accent underline-offset-2 hover:underline">
              Cookie Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-shrink-0 gap-2">
          <button
            type="button"
            onClick={() => decide('rejected')}
            aria-label="Reject non-essential cookies"
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs uppercase tracking-[0.15em] font-heading font-bold text-slate-700 transition-colors hover:bg-slate-50 dark:hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => decide('accepted')}
            aria-label="Accept cookies"
            className="rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 px-4 py-2 text-xs uppercase tracking-[0.15em] font-heading font-bold text-white border border-transparent shadow-sm transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
