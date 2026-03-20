import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0A0A0A',
          secondary: '#111111',
        },
        surface: '#1A1A1A',
        border: '#2A2A2A',
        text: {
          primary: '#F5F5F5',
          secondary: '#A0A0A0',
        },
        accent: {
          red: '#C0392B',
          'red-hover': '#E74C3C',
          gold: '#BFA07A',
        },
        tangred: {
          black: '#0A0A0A',
          dark: '#111111',
          surface: '#1A1A1A',
          border: '#2A2A2A',
          white: '#F5F5F5',
          muted: '#A0A0A0',
          red: '#C0392B',
          'red-hover': '#E74C3C',
          gold: '#BFA07A',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        label: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'hero': ['72px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'hero-sm': ['48px', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display': ['56px', { lineHeight: '1.1' }],
        'heading-xl': ['48px', { lineHeight: '1.2' }],
        'heading-lg': ['36px', { lineHeight: '1.3' }],
        'heading-md': ['28px', { lineHeight: '1.4' }],
        'nav': ['13px', { letterSpacing: '0.15em' }],
        'label': ['11px', { letterSpacing: '0.3em' }],
        'eyebrow': ['14px', { letterSpacing: '0.4em' }],
      },
      borderRadius: {
        DEFAULT: '2px',
        sm: '2px',
        md: '4px',
        lg: '4px',
        xl: '4px',
        full: '9999px',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      transitionDuration: {
        DEFAULT: '300ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'pulse-red': 'pulseRed 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 1.5s ease-in-out infinite',
        'slide-in-right': 'slideInRight 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'slide-out-right': 'slideOutRight 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'chevron-bounce': 'chevronBounce 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseRed: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(192, 57, 43, 0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(192, 57, 43, 0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        chevronBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
        'red-glow': 'radial-gradient(ellipse at center, rgba(192,57,43,0.15) 0%, transparent 70%)',
        'card-shimmer': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
      },
    },
  },
  plugins: [],
}

export default config
