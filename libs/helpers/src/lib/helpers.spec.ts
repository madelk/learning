import { detectAppFromPath } from './helpers.js';

describe('helpers', () => {
  describe('detectAppFromPath', () => {
  it('should work', () => {
    // Arrange
    const path = '/react/some/path';
    const expectedApp = 'react';

    // Act
    const result: string = detectAppFromPath(path);

    // Assert
    expect(result).toBe(expectedApp);
  });
});
});
