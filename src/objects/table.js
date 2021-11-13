const table = {
  xMin: 0,
  xMax: 5,
  yMin: 0,
  yMax: 5,

  isValidX(x) {
    return x >= this.xMin && x <= this.xMax;
  },
  
  isValidY(y) {
    return y >= this.yMin && y <= this.yMax;
  },
}

module.exports = table;