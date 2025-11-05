import type { Config } from 'tailwindcss';

// Force refresh comment
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}', // Ensure content directory is included for prose styles
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#000000',
          '50': '#f6f6f6',
          '100': '#e7e7e7',
          '200': '#d1d1d1',
          '300': '#b0b0b0',
          '400': '#888888',
          '500': '#6d6d6d',
          '600': '#5d5d5d',
          '700': '#4f4f4f',
          '800': '#454545',
          '900': '#3d3d3d',
          '950': '#000000',
        },
      },
      typography: (theme: (path: string) => any) => ({
        DEFAULT: {
          css: {
            // Add base styles if needed
          },
        },
        invert: { // Apply styles to prose-invert (used in your BlogPostClientContent)
          css: {
            // Target images within the prose-invert scope
            img: {
              borderRadius: theme('borderRadius.lg'), // Use theme value for rounded-lg
              // Add glow effect using box-shadow
              boxShadow: `0 0 15px 3px ${theme('colors.purple.500')}`,
            },
            // Add any other inverted prose overrides here
          },
        },
        // You can define other custom prose modifiers if needed
        // custom: { css: { ... } }
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config; 
