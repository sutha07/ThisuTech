/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#e8eef7',
          100: '#c5d3ea',
          200: '#9fb6da',
          300: '#7898ca',
          400: '#5a82be',
          500: '#3d6cb2',
          600: '#2e5699',
          700: '#1e3f7a',
          800: '#132d5e',
          900: '#0B2C5F',
          950: '#071b3d',
        },
        orange: {
          DEFAULT: '#FF7A00',
          50:  '#fff4e6',
          100: '#ffe3bf',
          200: '#ffcf94',
          300: '#ffba69',
          400: '#ffa73e',
          500: '#FF7A00',
          600: '#e06d00',
          700: '#b85a00',
          800: '#904700',
          900: '#683400',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'gradient': 'gradient 6s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundSize: {
        '200%': '200% 200%',
      },
      boxShadow: {
        'card': '0 4px 20px rgba(11, 44, 95, 0.1)',
        'card-hover': '0 8px 40px rgba(11, 44, 95, 0.2)',
        'orange': '0 4px 20px rgba(255, 122, 0, 0.3)',
      },
    },
  },
  plugins: [],
}
