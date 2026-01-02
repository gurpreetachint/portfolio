/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#7C3AED', // Vibrant purple
          DEFAULT: '#7867bc',
          dark: '#9f94d3',
        },
        accent: {
          purple: {
            light: '#A78BFA',
            dark: '#9f94d3',
          },
          blue: {
            light: '#2563EB', // Deeper blue
            dark: '#60A5FA',
          },
          green: {
            light: '#22D3EE', // Teal accent
            dark: '#34D399',
          },
        },
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#111827',
          light: '#F9FAFB', // Brighter background
          muted: '#E5E7EB', // More contrast for muted
        },
        text: {
          DEFAULT: '#1F2937', // Slightly deeper
          light: '#4B5563',
          muted: '#9CA3AF',
          dark: {
            DEFAULT: '#F9FAFB',
            light: '#D1D5DB',
            muted: '#9CA3AF',
          }
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'hard': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'soft-dark': '0 2px 15px rgba(0, 0, 0, 0.3)',
        'medium-dark': '0 4px 20px rgba(0, 0, 0, 0.4)',
        'hard-dark': '0 8px 30px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-soft': 'bounceSoft 2s infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'var(--tw-prose-body)',
            lineHeight: '1.75',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}

