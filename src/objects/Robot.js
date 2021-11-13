const { isNil } = require("lodash");
const headings = require("../constants/headings");
const table = require("./table");
const validHeadings = Object.keys(headings);

class Robot {
  constructor() {
    this._x = undefined;
    this._y = undefined;
    this._heading = undefined;
  }

  get x() {
    return this._x;
  }

  set x(newValue) {
    this._x = parseInt(newValue);
  }

  get y() {
    return this._y;
  }

  set y(newValue) {
    this._y = parseInt(newValue);
  }

  get heading() {
    return this._heading;
  }

  set heading(newValue) {
    this._heading = Math.abs((parseInt(newValue) + 360) % 360);
  }

  get direction() {
    const heading = Object.entries(headings).find(
      ([direction, angle]) => angle === this._heading
    );
    return heading?.[0] || undefined;
  }

  get isPlaced() {
    return !isNil(this.x) && !isNil(this.x) && !isNil(this.heading);
  }

  get magnitude() {
    return {
      x: Math.round(Math.cos((this.heading * Math.PI) / 180)),
      y: Math.round(Math.sin((this.heading * Math.PI) / 180)),
    };
  }

  /**
   * @returns {Boolean}
   */
  place(params) {
    const { x = 0, y = 0, heading = "NORTH" } = params;

    if (this.isValidPlacement(params)) {
      this.x = x;
      this.y = y;
      this.heading = headings[heading];
      return true;
    }

    return false;
  }

  move() {
    if (this.isPlaced) {
      const newPosX = this.x + this.magnitude.x;
      const newPosY = this.y + this.magnitude.y;

      if (!table.isValidX(newPosX) || !table.isValidY(newPosY)) {
        console.warn(
          `Moving to (${newPosX}, ${newPosY}) is not possible. Please turn around.`
        );
        return;
      }

      this.x = newPosX;
      this.y = newPosY;
      return true;
    }
    return false;
  }

  turnLeft() {
    if (this.isPlaced) {
      this.heading += 90;
      return true;
    }
    return false;
  }

  turnRight() {
    if (this.isPlaced) {
      this.heading -= 90;
      return true;
    }
    return false;
  }

  report() {
    console.log(`${this.x}, ${this.y}, ${this.direction}`);
  }

  isValidPlacement({ x = 0, y = 0, heading = "NORTH" }) {
    return (
      table.isValidX(x) && table.isValidY(y) && this.isValidHeading(heading)
    );
  }

  isValidHeading(heading) {
    const uppercaseHeading = heading?.toUpperCase();
    return validHeadings.includes(uppercaseHeading);
  }
}

module.exports = Robot;
