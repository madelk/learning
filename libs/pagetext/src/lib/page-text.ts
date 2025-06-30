import { getCurrentApp } from '@study/helpers';

export const getHomepageText = () => {
  return {
    title: {
      text: `Hi and welcome to my study app for ${getCurrentApp()}!`,
      className: 'text-3xl font-bold text-center mb-4',
    },
    paragraphs: {
      text: [
        "You'll find a framework selector in the top left corner that will let you see this app running in different frameworks.",
        'The header and footer are both web components to help make sure we get the same look and feel across all frameworks.',
        'But this text is a pure JS library imported into each framework so it stays the same!',
        "There's also a calculator page on the nav, and this shares a fair bit of logic across both react and vue.",
        'All of these frameworks are kept together into a single monorepo and when code is merged to main, it will automatically deploy to Azure.',
      ],
      className: 'text-lg text-gray-700',
    },
  };
};
