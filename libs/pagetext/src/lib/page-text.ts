
import { getCurrentApp } from '@study/helpers'

export const getHomepageText = () => {
  return {
    title: `Welcome to the Homepage for ${getCurrentApp()}`,
    paragraphs: [
      'This is the first paragraph of the homepage.',
      'Here is another paragraph providing more information about the homepage.',
    ]
  };
};
