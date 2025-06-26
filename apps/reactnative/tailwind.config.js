/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{ts,tsx,js,jsx,html}',
    './index.html',
    '../../libs/pagetext/src/**/*.{ts,tsx,js,jsx,vue,html}',
    '../../libs/navbar/src/**/*.{ts,tsx,js,jsx,vue,html}',
    '../../libs/helpers/src/**/*.{ts,tsx,js,jsx,vue,html}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
