const table = require('./table');

describe('Function: isValidX()', () => {
  it('Should be true if within bounds.', () => {
    expect(table.isValidX(0)).toBe(true);
    expect(table.isValidX(5)).toBe(true);
  });

  it('Should be false if out of bounds.', () => {
    expect(table.isValidX(-1)).toBe(false);
    expect(table.isValidX(6)).toBe(false);
  });
});

describe('Function: isValidX()', () => {
  it('Should be true if within bounds.', () => {
    expect(table.isValidY(0)).toBe(true);
    expect(table.isValidY(5)).toBe(true);
  });

  it('Should be false if out of bounds.', () => {
    expect(table.isValidY(-1)).toBe(false);
    expect(table.isValidY(6)).toBe(false);
  });
});

