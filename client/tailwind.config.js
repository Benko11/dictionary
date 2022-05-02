module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        fontFamily: {
            headers: ['Nixie One'],
            body: ['Merriweather'],
        },
        extend: {},
    },
    plugins: [require('@tailwindcss/forms')],
};
