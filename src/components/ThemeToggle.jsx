'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/lib/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`relative flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-black/5 backdrop-blur-md transition-colors duration-300 hover:border-violet-400/40 hover:bg-violet-400/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 ${className}`}
    >
      <Sun
        size={16}
        className={`absolute text-indigo-500 transition-all duration-300 ${
          isDark ? 'scale-0 -rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
        }`}
      />
      <Moon
        size={16}
        className={`absolute text-violet-300 transition-all duration-300 ${
          isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 rotate-90 opacity-0'
        }`}
      />
    </button>
  );
}