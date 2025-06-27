import { getHomepageText } from './page-text.js';

describe('pageText', () => {
  describe('getHomepageText', () => {
    it('should return homepage text configuration', () => {
      const result = getHomepageText();
      
      expect(result).toBeDefined();
      expect(result.title).toBeDefined();
      expect(result.title.text).toContain('Welcome to the Homepage');
      expect(result.title.className).toBe('text-3xl font-bold text-center mb-4');
      expect(result.paragraphs).toBeDefined();
      expect(result.paragraphs.text).toBeInstanceOf(Array);
      expect(result.paragraphs.text.length).toBe(2);
      expect(result.paragraphs.className).toBe('text-lg text-gray-700');
    });
  });
});
