const formatString = require('./formatString');

describe('Utility: formatString()', () => {
  it('Should return uppercase string.', () => {
    expect(formatString('Hello')).toBe('HELLO');
  });
  it('Should only include upper and lower cased alphabets.', () => {
    expect(formatString('Hello World #@&*')).toBe('HELLOWORLD');
  });
});