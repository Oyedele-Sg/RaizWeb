/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/shared/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'auth-pattern': "url('/patterns/auth-bg-pattern.svg')",
				'profile-1': "url('/patterns/profile-1.svg')",
			},
			colors: {
				white: '#FFFFFF',
				purple: '#4B0082',
				yellow: '#FFC857',
				grey: '#F4F4F4',
				error: '#B3261E',
				'neutral-10': '#FDFDFD',
				'neutral-20': '#F0EBF4',
				'neutral-30': '#E7DFEE',
				'neutral-40': '#DFD2EB',
				'neutral-50': '#CEBFDD',
				'neutral-60': '#BFABD3',
				'neutral-70': '#9881AE',
				'neutral-80': '#7E6298',
				'neutral-90': '#64497D',
				'neutral-100': '#493260',
				positive: '#7ABA98',
			},
			fontSize: {
				't-18': '1.125rem',
				't-16': '1rem',
				't-40': '2.5rem',
				't-24': '1.5rem',
				't-20': '1.25rem',
				't-14': '0.875rem',
				't-12': '0.75rem',
				't-36': '2.25rem',
				't-57': '3.5625rem',
				't-45': '2.8125rem',
				't-32': '2rem',
				't-28': '1.75rem',
				't-22': '1.375rem',
				't-11': '0.6875rem',
			},
			fontWeight: {
				light: 300,
				regular: 400,
				'semi-mid': 500,
				medium: 600,
				bold: 700,
				'extra-bold': 800,
			},
			borderRadius: {
				'r-8': '8px',
				'r-12': '12px',
				'r-6': '6px',
			},
			boxShadow: {
				match: '0px 16px 42px rgba(0, 0, 0, 0.07)',
				opening: '0px 1px 4px rgba(17, 17, 17, 0.12)',
			},
			lineHeight: {
				'extra-loose': '2.5',
				12: '3rem',
			},
		},
		container: {
			center: true,
		},
		fontFamily: {
			manrope: ['Manrope', 'sans-serif'],
		},
		boxShadow: {
			'auth-btn':
				'0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
		},
	},
	plugins: [
		require('@tailwindcss/forms')({
			strategy: 'base', // only generate global styles
		}),
	],
}
