import { getCurrentApp } from '@study/helpers'
// using tailwind classes for styling

export const getHomepageText = () => {
  return {
    title: {
      text: `Welcome to the Homepage for ${getCurrentApp()}`,
      className: 'text-3xl font-bold text-center mb-4',
    },
    paragraphs: [
      'This is the first paragraph of the homepage.',
      'Here is another paragraph providing more information about the homepage.',
    ]
  };
};
