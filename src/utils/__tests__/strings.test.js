import { concatenateStrings } from '../string';

describe('concatenateStrings', () => {
  it('should concatenate multiple strings with a space', () => {
    const result = concatenateStrings('Hello', 'world', '!');
    expect(result).toBe('Hello world !');
  });

  it('should concatenate strings and numbers', () => {
    const result = concatenateStrings('The answer is', 42);
    expect(result).toBe('The answer is 42');
  });

  it('should handle a single string', () => {
    const result = concatenateStrings('Hello');
    expect(result).toBe('Hello');
  });

  it('should handle a single number', () => {
    const result = concatenateStrings(123);
    expect(result).toBe('123');
  });

  it('should return an empty string if no arguments are passed', () => {
    const result = concatenateStrings();
    expect(result).toBe('');
  });

  it('should handle empty strings correctly', () => {
    const result = concatenateStrings('Hello', '', 'world');
    expect(result).toBe('Hello  world'); // Заметьте, что два пробела между 'Hello' и 'world'
  });
});
