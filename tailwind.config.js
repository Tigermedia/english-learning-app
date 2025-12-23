/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B6B',
          dark: '#E85555',
        },
        secondary: {
          DEFAULT: '#4ECDC4',
          dark: '#3DB8B0',
        },
        accent: {
          DEFAULT: '#FFE66D',
          dark: '#FFD93D',
        },
        success: {
          DEFAULT: '#7BC950',
          dark: '#5DA83A',
        },
        warning: '#FFB347',
        background: '#F7F9FC',
        card: '#FFFFFF',
        text: {
          DEFAULT: '#2D3748',
          light: '#718096',
        },
      },
      fontFamily: {
        sans: ['Heebo', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'playful': '1.5rem',
        'button': '9999px',
      },
    },
  },
  plugins: [],
}
