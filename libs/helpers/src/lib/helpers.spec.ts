import { detectAppFromPath } from './helpers.js';

describe('helpers', () => {
  describe('detectAppFromPath', () => {
  it('should work', () => {
    // Arrange
    const path = '/reactnative/some/path';
    const expectedApp = 'reactnative';

    // Act
    const result: string = detectAppFromPath(path);

    // Assert
    expect(result).toBe(expectedApp);
  });
});
});
