/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
	  extend: {
		colors: {
		  fontblue: '#9cc4ff',
		},
		borderRadius: {
		  lg: 'var(--radius)',
		  md: 'calc(var(--radius) - 2px)',
		  sm: 'calc(var(--radius) - 4px)',
		},
		fontFamily: {
		  poppins: ["Poppins", "sans-serif"],
		  montserrat: ["Montserrat", "sans-serif"],
		},
	  },
	},
	plugins: [require("tailwindcss-animate")],
  };
  