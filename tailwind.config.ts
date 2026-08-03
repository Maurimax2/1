import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: '#050505',
          50: '#0a0a0c',
          100: '#0d0d11',
          200: '#121218',
          300: '#17171f',
        },
        electric: {
          DEFAULT: '#2f7bff',
          soft: '#5b9dff',
          deep: '#1450d8',
          cyan: '#22d3ee',
        },
        neon: {
          DEFAULT: '#a855f7',
          soft: '#c084fc',
          deep: '#7c3aed',
          pink: '#e879f9',
        },
        /* Pulled straight from the MOORTV logo — crimson dunes, plum sky, coral moon. */
        ember: {
          DEFAULT: '#ef2b47',
          soft: '#ff4d5f',
          moon: '#f4917a',
          plum: '#6b1839',
          night: '#4a1030',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },
      boxShadow: {
        glow: '0 0 60px -12px rgba(47,123,255,0.55)',
        'glow-neon': '0 0 70px -10px rgba(168,85,247,0.6)',
        glass: '0 24px 70px -30px rgba(0,0,0,0.9), inset 0 1px 0 0 rgba(255,255,255,0.07)',
        lift: '0 40px 90px -40px rgba(47,123,255,0.5)',
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to bottom, transparent, #050505), radial-gradient(ellipse at top, rgba(47,123,255,0.18), transparent 60%)',
      },
      keyframes: {
        aurora: {
          '0%, 100%': { transform: 'translate3d(0,0,0) rotate(0deg) scale(1)' },
          '33%': { transform: 'translate3d(6%, -8%, 0) rotate(40deg) scale(1.18)' },
          '66%': { transform: 'translate3d(-7%, 6%, 0) rotate(-30deg) scale(0.92)' },
        },
        'gradient-pan': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-22px) translateX(8px)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'border-spin': {
          to: { '--angle': '360deg' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%': { transform: 'scale(1.6)', opacity: '0' },
          '100%': { opacity: '0' },
        },
        'scroll-dot': {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '35%': { opacity: '1' },
          '100%': { transform: 'translateY(14px)', opacity: '0' },
        },
      },
      animation: {
        aurora: 'aurora 22s ease-in-out infinite',
        'gradient-pan': 'gradient-pan 8s ease infinite',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 11s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
        shimmer: 'shimmer 2.4s infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.24,0,0.38,1) infinite',
        'scroll-dot': 'scroll-dot 1.9s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
