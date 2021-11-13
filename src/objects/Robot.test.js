const Robot = require('./Robot');

describe('Function: place()', () => {
  it('Should be placed if within bounds.', () => {
    const robot = new Robot();
    const isSuccessful = robot.place({x: 3, y: 2, heading: 'SOUTH'})
    expect(robot.x).toBe(3);
    expect(robot.y).toBe(2);
    expect(robot.direction).toBe('SOUTH');
    expect(robot.isPlaced).toBe(true);
    expect(isSuccessful).toBe(true);
  });

  it('Should not be placed if out of bounds.', () => {
    const robot = new Robot();
    const isSuccessful = robot.place({x: 10, y: 10, heading: ''})
    expect(robot.x).toBe(undefined);
    expect(robot.y).toBe(undefined);
    expect(robot.direction).toBe(undefined);
    expect(robot.isPlaced).toBe(false);
    expect(isSuccessful).toBe(false);
  });
});

describe('Function: move()', () => {
  it('Should not be able to move if not placed', () => {
    const robot = new Robot();
    expect(robot.isPlaced).toBe(false);
    expect(robot.move()).toBe(false);
  });

  it('Should be able to move if placed', () => {
    const robot = new Robot();
    robot.place({x: 3, y: 2, heading: 'SOUTH'})
    expect(robot.isPlaced).toBe(true);
    expect(robot.move()).toBe(true);
    expect(robot.x).toBe(3);
    expect(robot.y).toBe(1);
    expect(robot.direction).toBe('SOUTH');
  });
});

describe('Function: turnLeft()', () => {
  it('Should not be able to turn left if not placed', () => {
    const robot = new Robot();
    expect(robot.isPlaced).toBe(false);
    expect(robot.turnLeft()).toBe(false);
  });

  it('Should be able to move turn left if placed', () => {
    const robot = new Robot();
    robot.place({x: 3, y: 2, heading: 'SOUTH'})
    expect(robot.isPlaced).toBe(true);
    expect(robot.turnLeft()).toBe(true);
    expect(robot.x).toBe(3);
    expect(robot.y).toBe(2);
    expect(robot.direction).toBe('EAST');
  });
});

describe('Function: turnRight()', () => {
  it('Should not be able to turn right if not placed', () => {
    const robot = new Robot();
    expect(robot.isPlaced).toBe(false);
    expect(robot.turnRight()).toBe(false);
  });

  it('Should be able to move turn right if placed', () => {
    const robot = new Robot();
    robot.place({x: 3, y: 2, heading: 'SOUTH'})
    expect(robot.isPlaced).toBe(true);
    expect(robot.turnRight()).toBe(true);
    expect(robot.x).toBe(3);
    expect(robot.y).toBe(2);
    expect(robot.direction).toBe('WEST');
  });
});

describe('Function: isValidPlacement()', () => {
  it('Should return true for valid placements', () => {
    const robot = new Robot();
    expect(robot.isValidPlacement({x: 3, y: 2, heading: 'SOUTH'})).toBe(true);
  });
  it('Should return false for invalid placements', () => {
    const robot = new Robot();
    expect(robot.isValidPlacement({x: -1, y: 10, heading: 'Test'})).toBe(false);
  });
});

describe('Function: isValidHeading()', () => {
  it('Should return true for supported directions', () => {
    const robot = new Robot();
    expect(robot.isValidHeading('NORTH')).toBe(true);
    expect(robot.isValidHeading('SOUTH')).toBe(true);
    expect(robot.isValidHeading('EAST')).toBe(true);
    expect(robot.isValidHeading('WEST')).toBe(true);
  });

  it('Should return false for supported directions', () => {
    const robot = new Robot();
    expect(robot.isValidHeading('')).toBe(false);
    expect(robot.isValidHeading('&*#(@$')).toBe(false);
    expect(robot.isValidHeading('Test')).toBe(false);
  });
});