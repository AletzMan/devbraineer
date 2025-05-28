/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {},
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: ['cupcake', 'dark', 'business', 'light'],
        darkTheme: 'dark',
    },
    darkMode: 'class',
    safelist: [
        // Clases de tipo de gradiente (bg-gradient-to-r, bg-gradient-to-l, etc.)
        {
            pattern: /bg-linear-to-(r|l|t|b|tr|tl|br|bl)/,
        },
        // Clases de color (from-, via-, to-) con cualquier color y tono
        {
            pattern:
                /(from|via|to)-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|gray|zinc|neutral|stone)-(50|100|200|300|400|500|600|700|800|900|950)/,
            variants: ['hover', 'focus'], // Puedes añadir variantes si tus tooltips u otros elementos las usan
        },
        // Si usas bg-radial, asegúrate de que también se incluya
        'bg-radial',
        'bg-gradient-to',
    ],
};
