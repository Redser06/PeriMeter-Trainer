/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./PeriMeterTraining/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // support toggling dark mode via .dark class
  theme: {
    extend: {
      colors: {
        surface: '#f8f9fa',
        'surface-dim': '#d9dadb',
        'surface-bright': '#ffffff', // brightened slightly
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f3f4f5',
        'surface-container': '#edeeef',
        'surface-container-high': '#e7e8e9',
        'surface-container-highest': '#e1e3e4',
        'on-surface': '#191c1d',
        'on-surface-variant': '#434655',
        'inverse-surface': '#2e3132',
        'inverse-on-surface': '#f0f1f2',
        outline: '#737686',
        'outline-variant': '#c3c6d7',
        primary: '#004ac6',
        'on-primary': '#ffffff',
        'primary-container': '#2563eb',
        'on-primary-container': '#eeefff',
        secondary: '#555f70',
        'on-secondary': '#ffffff',
        'secondary-container': '#d6e0f4',
        'on-secondary-container': '#596374',
        tertiary: '#006329',
        'on-tertiary': '#ffffff',
        'tertiary-container': '#007f36',
        'on-tertiary-container': '#c7ffca',
        error: '#ba1a1a',
        'on-error': '#ffffff',
        'error-container': '#ffdad6',
        'on-error-container': '#93000a',
        background: '#f8f9fa',
        'on-background': '#191c1d',
        'surface-variant': '#e1e3e4',
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        gutter: '1rem',
        'margin-mobile': '1rem',
        'margin-desktop': '1.5rem',
      }
    },
  },
  plugins: [],
}
