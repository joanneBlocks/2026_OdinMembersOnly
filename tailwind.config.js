module.exports = {
  darkMode: 'class',
  content: [
    './views/**/*.ejs',
    './public/**/*.js',
    './src/**/*.jsx'
  ],
  safelist: [
    'bg-ivory', 'bg-champagne', 'bg-roseGold', 'bg-softBlush',
    'bg-deepPlum', 'bg-midnightPlum', 'bg-dustyMauve',
    'text-ivory', 'text-champagne', 'text-roseGold', 'text-softGold',
    'text-deepPlum', 'text-warmGray', 'text-softBlush',
    'border-champagne', 'border-roseGold', 'border-softGold',
    'shadow-soft', 'shadow-elevated', 'shadow-glow',
    'rounded-card', 'rounded-btn',
    'font-serif', 'font-sans',
    'dark:bg-midnightPlum', 'dark:bg-dustyMauve',
    'dark:text-ivory', 'dark:text-warmGray',
    'dark:border-dustyMauve',
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#F8F5F0',
        champagne: '#E7DCCF',
        roseGold: '#C89F7A',
        softGold: '#D6B56D',
        deepPlum: '#4A2E3A',
        warmGray: '#8C8681',
        softBlush: '#F3E7E7',
        midnightPlum: '#2B1B24',
        dustyMauve: '#6E4B5B',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        btn: '12px',
      },
      boxShadow: {
        soft: '0px 4px 12px rgba(74, 46, 58, 0.08)',
        elevated: '0px 8px 24px rgba(74, 46, 58, 0.12)',
        glow: '0px 0px 10px rgba(200, 159, 122, 0.35)',
      },
    },
  },
  plugins: [],
}