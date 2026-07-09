/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        background: '#0A0A0A',
        foreground: '#FFFFFF',
        'core': '#111111',
        'secondary-panel': '#1A1A1A',
        'accent': '#C7FF3A',
        'accent-glow': '#D9FF7A',
        'text-secondary': '#A0A0A0',
        card: {
          DEFAULT: '#111111',
          foreground: '#FFFFFF'
        },
        popover: {
          DEFAULT: '#111111',
          foreground: '#FFFFFF'
        },
        primary: {
          DEFAULT: '#111111',
          foreground: '#FFFFFF'
        },
        secondary: {
          DEFAULT: '#1A1A1A',
          foreground: '#FFFFFF'
        },
        muted: {
          DEFAULT: '#1A1A1A',
          foreground: '#A0A0A0'
        },
        accent: {
          DEFAULT: '#C7FF3A',
          foreground: '#0A0A0A',
          glow: '#D9FF7A'
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#FFFFFF'
        },
        border: 'rgba(255, 255, 255, 0.08)',
        input: 'rgba(255, 255, 255, 0.1)',
        ring: '#C7FF3A',
      },
      fontFamily: {
        heading: ['Syne', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Syne', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace']
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '40': '10rem',
      },
      fontSize: {
        'hero': ['clamp(3rem, 9vw, 8rem)', { lineHeight: '0.95', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display': ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'section': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'breathe': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' }
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' }
        },
        'light-sweep': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' }
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'breathe': 'breathe 4s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'light-sweep': 'light-sweep 8s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}
