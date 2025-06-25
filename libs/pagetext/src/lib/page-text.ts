
import { getCurrentApp } from '@study/helpers'

export const getHomepageText = () => {
  return {
    title: {
      text: `Welcome to the Homepage for ${getCurrentApp()}`,
      className: 'mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl'
    },
    paragraphs: [
      'This is the first paragraph of the homepage.',
      'Here is another paragraph providing more information about the homepage.',
    ]
  };
};
