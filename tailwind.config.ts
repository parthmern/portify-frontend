import type { Config } from "tailwindcss";

export default {
	darkMode: ['class', 'class'],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			typography: (theme: any) => ({
				DEFAULT: {
					css: {
						'--tw-prose-links': theme('colors.blue.300'), // Set your custom link color
						'--tw-prose-links-hover': theme('colors.blue.500'), // Optional hover color
						'--tw-prose-bold' : theme('colors.blue.100'),
						a: {
							color: 'var(--tw-prose-links)',
							'&:hover': {
								color: 'var(--tw-prose-links-hover)',
							},
						},
						strong : {
							color: 'var(--tw-prose-bold)',
							'&:hover': {
								color: 'var(--tw-prose-links)',
							},
						},
					},
				},
				custom: {
					css: {
						'--tw-prose-links': theme('colors.red.500'), // Another custom color variant
						'--tw-prose-links-hover': theme('colors.red.700'),
					},
				},
			}),
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				'color-1': 'hsl(var(--color-1))',
				'color-2': 'hsl(var(--color-2))',
				'color-3': 'hsl(var(--color-3))',
				'color-4': 'hsl(var(--color-4))',
				'color-5': 'hsl(var(--color-5))'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			animation: {
				'shiny-text': 'shiny-text 8s infinite',
				rainbow: 'rainbow var(--speed, 2s) infinite linear',
				shine: 'shine var(--duration) infinite linear'
			},
			keyframes: {
				'shiny-text': {
					'0%, 90%, 100%': {
						'background-position': 'calc(-100% - var(--shiny-width)) 0'
					},
					'30%, 60%': {
						'background-position': 'calc(100% + var(--shiny-width)) 0'
					}
				},
				rainbow: {
					'0%': {
						'background-position': '0%'
					},
					'100%': {
						'background-position': '200%'
					}
				},
				shine: {
					'0%': {
						'background-position': '0% 0%'
					},
					'50%': {
						'background-position': '100% 100%'
					},
					to: {
						'background-position': '0% 0%'
					}
				}
			}
		}
	},
	plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography'),],
} satisfies Config;
