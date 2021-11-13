function formatString(string = "") {
  const match = string?.match(/[a-zA-Z]+/g);
  return match?.join('').toUpperCase();
}

module.exports = formatString;
