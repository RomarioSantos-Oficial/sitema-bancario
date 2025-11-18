/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Vectra Blue
        vectra: {
          blue: '#1059FF',
          'dark-blue': '#0A2B6B',
          'light-blue': '#5FA4FF',
        },
        // Neutras
        neutral: {
          light: '#E6E9F0',
          medium: '#A3A9B8',
          dark: '#3C3F45',
          black: '#0C0C0C',
        },
        // Ações
        success: '#35C46A',
        error: '#E54646',
        warning: '#F2C94C',
        // Paleta Black Premium
        premium: {
          black: '#000000',
          graphite: '#1A1A1A',
          gray: '#2C2C2C',
          gold: '#C9A035',
          'light-gold': '#E5C87A',
          white: '#F5F5F5',
        },
        // Tipos de conta (cores por tipo)
        account: {
          corrente: '#1059FF',
          poupanca: '#35C46A',
          salario: '#8B5CF6',
          universitaria: '#F2C94C',
          empresarial: '#E54646',
          black: '#000000',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
