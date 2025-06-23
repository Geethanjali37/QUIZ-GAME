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
          light: '#4F46E5', // Indigo for light mode
          dark: '#818CF8',  // Lighter indigo for dark mode
          DEFAULT: '#4F46E5'
        },
        secondary: {
          light: '#059669', // Emerald for light mode
          dark: '#34D399',  // Lighter emerald for dark mode
          DEFAULT: '#059669'
        },
        background: {
          light: '#F8FAFC', // Very light blue-gray for light mode
          dark: '#0F172A',  // Dark blue-gray for dark mode
          DEFAULT: '#F8FAFC'
        },
        text: {
          light: '#1E293B', // Dark blue-gray for light mode
          dark: '#E2E8F0',  // Light blue-gray for dark mode
          DEFAULT: '#1E293B'
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
} 