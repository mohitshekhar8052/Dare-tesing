module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg)',
        primary: '#7c3aed',
        secondary: '#06b6d4',
        muted: '#f3f4f6',
        'pastel-coral': '#ff7b7b',
        'pastel-yellow': '#ffd166',
        'pastel-blue': '#7dd3fc',
        'pastel-rose': '#ffb4c1'
      }
    }
  },
  plugins: []
}
