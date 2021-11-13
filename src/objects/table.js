const table = {
  xMin: 0,
  xMax: 4,
  yMin: 0,
  yMax: 4,

  isValidX(x) {
    return x >= this.xMin && x <= this.xMax;
  },
  
  isValidY(y) {
    return y >= this.yMin && y <= this.yMax;
  },
}

module.exports = table;