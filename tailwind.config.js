/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class', // 👈 enables class-based dark mode
    content: [
        "./index.html",
        "./src/**/*.{vue,ts,js,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
