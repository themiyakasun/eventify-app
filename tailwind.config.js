/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter-Regular', 'sans-serif'],
        'inter-medium': ['Inter-Medium', 'sans-serif'],
        'inter-semiBold': ['Inter-SemiBold', 'sans-serif'],
        'inter-bold': ['Inter-Bold', 'sans-serif'],
        'inter-extraBold': ['Inter-ExtraBold', 'sans-serif'],
        'inter-light': ['Inter-Light', 'sans-serif'],
        'inter-extraLight': ['Inter-ExtraLight', 'sans-serif'],
      },

      colors: {
        primary: {
          100: '#FFF5EE',
          200: '#FFE3D2',
          300: '#FFD1B3',
          400: '#FFBF93',
          500: '#F76810',
        },
        secondary: {
          yellow: '#FBBE47',
          blue: '#3E82F7',
          green: '#29D697',
          darkOrange: '#8C3700',
          white: '#FFFF',
          grey: '#F0F0EE',
          grey2: '#E1E1E1',
          softDarkish: '#4A4D55',
        },
        info: '#2F80ED',
        success: '#27AE60',
        warning: '#E2B93B',
        error: '#EB5757',
        icon: '#ADABAB',
        backgroundImage: {
          'gradient-orange': 'linear-gradient(to right, #F76810, #F76810)',
          'gradient-black': 'linear-gradient(to right, #171924, #171924)',
          'gradient-button': 'linear-gradient(to right, #20222C, #20222C)',
          'gradient-divider': 'linear-gradient(to right, #20222C33, #20222C33)',
        },
      },
    },
  },
  plugins: [],
};
