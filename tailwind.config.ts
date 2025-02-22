import type { Config } from "tailwindcss"
import colors from "tailwindcss/colors"
import { withUt } from "uploadthing/tw";

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
	'./node_modules/onborda/dist/**/*.{js,ts,jsx,tsx}',
	],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			tremor: {
  				brand: {
  					faint: 'colors.blue[50]',
  					muted: 'colors.blue[200]',
  					subtle: 'colors.blue[400]',
  					DEFAULT: 'colors.blue[500]',
  					emphasis: 'colors.blue[700]',
  					inverted: 'colors.white'
  				},
  				background: {
  					muted: 'colors.gray[50]',
  					subtle: 'colors.gray[100]',
  					DEFAULT: 'colors.white',
  					emphasis: 'colors.gray[700]'
  				},
  				border: {
  					DEFAULT: 'colors.gray[200]'
  				},
  				ring: {
  					DEFAULT: 'colors.gray[200]'
  				},
  				content: {
  					subtle: 'colors.gray[400]',
  					DEFAULT: 'colors.gray[500]',
  					emphasis: 'colors.gray[700]',
  					strong: 'colors.gray[900]',
  					inverted: 'colors.white'
  				}
  			},
  			'dark-tremor': {
  				brand: {
  					faint: '#0B1229',
  					muted: 'colors.blue[950]',
  					subtle: 'colors.blue[800]',
  					DEFAULT: 'colors.blue[500]',
  					emphasis: 'colors.blue[400]',
  					inverted: 'colors.blue[950]'
  				},
  				background: {
  					muted: '#131A2B',
  					subtle: 'colors.gray[800]',
  					DEFAULT: 'colors.gray[900]',
  					emphasis: 'colors.gray[300]'
  				},
  				border: {
  					DEFAULT: 'colors.gray[800]'
  				},
  				ring: {
  					DEFAULT: 'colors.gray[800]'
  				},
  				content: {
  					subtle: 'colors.gray[600]',
  					DEFAULT: 'colors.gray[500]',
  					emphasis: 'colors.gray[200]',
  					strong: 'colors.gray[50]',
  					inverted: 'colors.gray[950]'
  				}
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			warning: 'hsl(var(--warning))',
  			'warning-foreground': 'hsl(var(--warning-foreground))',
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		boxShadow: {
  			'tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  			'tremor-card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  			'tremor-dropdown': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  			'dark-tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  			'dark-tremor-card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  			'dark-tremor-dropdown': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
  			'tremor-small': '0.375rem',
  			'tremor-default': '0.5rem',
  			'tremor-full': '9999px'
  		},
  		fontSize: {
  			'tremor-label': ['0.75rem', { lineHeight: '1rem' }],
  			'tremor-default': ['0.875rem', { lineHeight: '1.25rem' }],
  			'tremor-title': ['1.125rem', { lineHeight: '1.75rem' }],
  			'tremor-metric': ['1.875rem', { lineHeight: '2.25rem' }]
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'collapsible-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-collapsible-content-height)'
  				}
  			},
  			'collapsible-up': {
  				from: {
  					height: 'var(--radix-collapsible-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'shiny-text': {
  				'0%, 90%, 100%': {
  					'background-position': 'calc(-100% - var(--shiny-width)) 0'
  				},
  				'30%, 60%': {
  					'background-position': 'calc(100% + var(--shiny-width)) 0'
  				}
  			},
  			gradient: {
  				to: {
  					backgroundPosition: 'var(--bg-size) 0'
  				}
  			},
  			marquee: {
  				from: {
  					transform: 'translateX(0)'
  				},
  				to: {
  					transform: 'translateX(calc(-100% - var(--gap)))'
  				}
  			},
  			'marquee-vertical': {
  				from: {
  					transform: 'translateY(0)'
  				},
  				to: {
  					transform: 'translateY(calc(-100% - var(--gap)))'
  				}
  			},
  			'border-beam': {
  				'100%': {
  					'offset-distance': '100%'
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
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'collapsible-down': 'collapsible-down 0.2s ease-out',
  			'collapsible-up': 'collapsible-up 0.2s ease-out',
  			'shiny-text': 'shiny-text 8s infinite',
  			gradient: 'gradient 8s linear infinite',
  			marquee: 'marquee var(--duration) infinite linear',
  			'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
  			'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
  			shine: 'shine var(--duration) infinite linear'
  		}
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    require('daisyui'),
    require('@headlessui/tailwindcss'),
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
} satisfies Config

export default withUt(config);