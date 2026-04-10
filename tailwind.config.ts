import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─── USA Color Palette ────────────────────────────────────────
      colors: {
        'glory-red':        '#B22234', // Old Glory Red (official flag red)
        'glory-red-dark':   '#8B1A26',
        'glory-red-light':  '#D4404F',
        'glory-blue':       '#3C3B6E', // Old Glory Blue (official flag blue)
        'glory-blue-dark':  '#2a2950',
        'glory-blue-light': '#5554A0',
        'glory-gold':       '#FFD700',
        'glory-gold-dark':  '#CC9900',
        'navy-dark':        '#0d1117',
        'navy-mid':         '#1a1f3a',
        'navy-light':       '#252b4a',
        'parchment':        '#F5F0E8',
        'parchment-dark':   '#E8E0CC',
      },

      // ─── Typography ───────────────────────────────────────────────
      fontFamily: {
        // Headings — editorial, editorial gravitas
        'display': ['"Playfair Display"', 'Georgia', 'serif'],
        // Large hero numbers & display text
        'hero':    ['"Bebas Neue"', 'Impact', 'sans-serif'],
        // Body copy — clean & readable
        'body':    ['"Inter"', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        // Display hero sizes (Bebas Neue)
        'display-2xl': ['clamp(72px, 10vw, 120px)', { lineHeight: '1', letterSpacing: '0.05em' }],
        'display-xl':  ['clamp(56px, 7vw, 96px)',   { lineHeight: '1', letterSpacing: '0.04em' }],
        'display-lg':  ['clamp(40px, 5vw, 72px)',   { lineHeight: '1.05', letterSpacing: '0.03em' }],
        // Editorial headings (Playfair Display)
        'h1':  ['clamp(40px, 5vw, 72px)',  { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h2':  ['clamp(32px, 4vw, 56px)',  { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h3':  ['clamp(24px, 3vw, 40px)',  { lineHeight: '1.3' }],
        'h4':  ['clamp(20px, 2.5vw, 28px)', { lineHeight: '1.4' }],
        // Body sizes
        'body-lg': ['clamp(17px, 1.5vw, 20px)', { lineHeight: '1.7' }],
        'body':    ['16px',                       { lineHeight: '1.6' }],
        'caption': ['14px',                       { lineHeight: '1.5', letterSpacing: '0.02em' }],
        // Stat numbers
        'stat-xl': ['clamp(56px, 7vw, 96px)', { lineHeight: '1', letterSpacing: '0.02em' }],
        'stat-lg': ['clamp(40px, 5vw, 72px)', { lineHeight: '1' }],
        'stat-md': ['clamp(32px, 4vw, 56px)', { lineHeight: '1' }],
      },

      // ─── Spacing ──────────────────────────────────────────────────
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '46': '11.5rem',
        '50': '12.5rem',
        '128': '32rem',
        '144': '36rem',
      },

      // ─── Animations ───────────────────────────────────────────────
      animation: {
        'fade-in':        'fadeIn 0.8s ease-out forwards',
        'slide-up':       'slideUp 0.8s ease-out forwards',
        'slide-in-left':  'slideInLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
        'bounce-subtle':  'bounceSubtle 2s ease-in-out infinite',
        'pulse-gold':     'pulseGold 2s ease-in-out infinite',
        'flag-wave':      'flagWave 3s ease-in-out infinite',
        'count-up':       'countUp 0.5s ease-out forwards',
        'star-twinkle':   'starTwinkle 3s ease-in-out infinite',
        'spin-slow':      'spin 8s linear infinite',
        'shimmer':        'shimmer 2s linear infinite',
      },

      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%':   { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        pulseGold: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 0 0 rgba(255, 215, 0, 0.4)' },
          '50%':      { opacity: '0.8', boxShadow: '0 0 0 12px rgba(255, 215, 0, 0)' },
        },
        flagWave: {
          '0%, 100%': { transform: 'skewY(0deg) skewX(0deg)' },
          '25%':      { transform: 'skewY(1deg) skewX(1deg)' },
          '75%':      { transform: 'skewY(-1deg) skewX(-1deg)' },
        },
        starTwinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%':      { opacity: '1', transform: 'scale(1.2)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },

      // ─── Box Shadows ──────────────────────────────────────────────
      boxShadow: {
        'gold':      '0 4px 24px rgba(255, 215, 0, 0.25)',
        'gold-lg':   '0 8px 40px rgba(255, 215, 0, 0.35)',
        'red':       '0 4px 24px rgba(178, 34, 52, 0.3)',
        'blue':      '0 4px 24px rgba(60, 59, 110, 0.3)',
        'card':      '0 2px 12px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.06)',
        'card-hover':'0 8px 32px rgba(0,0,0,0.12), 0 24px 64px rgba(0,0,0,0.1)',
        'inset-top': 'inset 0 4px 16px rgba(0,0,0,0.1)',
        'glow-gold': '0 0 30px rgba(255, 215, 0, 0.4), 0 0 80px rgba(255, 215, 0, 0.15)',
      },

      // ─── Background Images ─────────────────────────────────────────
      backgroundImage: {
        'hero-gradient':    'linear-gradient(135deg, rgba(10,10,30,0.92) 0%, rgba(60,59,110,0.75) 50%, rgba(178,34,52,0.6) 100%)',
        'section-gradient': 'linear-gradient(180deg, transparent 0%, rgba(26,31,58,0.05) 100%)',
        'gold-shimmer':     'linear-gradient(90deg, transparent 0%, rgba(255,215,0,0.4) 50%, transparent 100%)',
        'glory-gradient':   'linear-gradient(135deg, #3C3B6E 0%, #1a1f3a 40%, #8B1A26 100%)',
        'parchment-texture': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
        'star-pattern':     "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpolygon points='10,1 12.9,7 19.5,7 14.3,11.2 16.2,18 10,14 3.8,18 5.7,11.2 0.5,7 7.1,7' fill='rgba(255,215,0,0.08)'/%3E%3C/svg%3E\")",
      },

      // ─── Backdrop Blur ────────────────────────────────────────────
      backdropBlur: {
        'xs': '2px',
        'glass': '20px',
      },

      // ─── Border Radius ────────────────────────────────────────────
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },

      // ─── Z-index ──────────────────────────────────────────────────
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },

      // ─── Screens ─────────────────────────────────────────────────
      screens: {
        'xs': '480px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
}

export default config
