/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // MentorIA Brand Colors
        brand: {
          primary: '#0077CC',        // Azure Blue
          accent: '#FFB100',         // Golden Amber
          secondary: '#2E8B57',      // Jungle Green
          ivory: '#FAFAF8',          // Ivory
          charcoal: '#2C2C2E',       // Charcoal
        },
        primary: {
          50: '#e6f3ff',
          100: '#b3d9ff',
          200: '#80bfff',
          300: '#4da6ff',
          400: '#1a8cff',
          500: '#0077CC',
          600: '#0066b3',
          700: '#005299',
          800: '#003d80',
          900: '#002966',
          DEFAULT: '#0077CC',
        },
        accent: {
          50: '#fff9e6',
          100: '#fff0b3',
          200: '#ffe680',
          300: '#ffdc4d',
          400: '#ffd21a',
          500: '#FFB100',
          600: '#e69e00',
          700: '#cc8a00',
          800: '#b37700',
          900: '#996300',
          DEFAULT: '#FFB100',
        },
        secondary: {
          50: '#e8f5f0',
          100: '#c3e4d1',
          200: '#9dd3b2',
          300: '#78c293',
          400: '#53b174',
          500: '#2E8B57',
          600: '#29794d',
          700: '#236743',
          800: '#1e5539',
          900: '#19432f',
          DEFAULT: '#2E8B57',
        },
        background: '#FAFAF8',
        surface: '#ffffff',
        'text-primary': '#2C2C2E',
        'text-secondary': '#6b7280',
        neutral: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          ivory: '#FAFAF8',
          charcoal: '#2C2C2E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 0.6s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 20%, 53%, 80%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '40%, 43%': { transform: 'translate3d(0, -8px, 0)' },
          '70%': { transform: 'translate3d(0, -4px, 0)' },
          '90%': { transform: 'translate3d(0, -2px, 0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 4px 15px -2px rgba(0, 0, 0, 0.08)',
        'glow': '0 0 20px rgba(0, 119, 204, 0.3)',
        'glow-accent': '0 0 20px rgba(255, 177, 0, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

