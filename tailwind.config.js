module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream:   { 50: '#FFFAF5', 100: '#FFF5EB' },
        coral:   { 400: '#FB7185', 500: '#F43F5E', 600: '#E11D48' },
        violet:  { 400: '#A78BFA', 500: '#8B5CF6', 600: '#7C3AED' },
        sunshine:{ 400: '#FBBF24' },
        ink:     { 900: '#1E293B', 600: '#475569', 400: '#94A3B8' },
        blush:   { 50: '#FFF1F2', 100: '#FFE4E6' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
