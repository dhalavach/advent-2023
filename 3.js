const fs = require('fs');
const data = fs.readFileSync('3.txt', 'utf8').split('\n');

const STRING_LENGTH = 140;
const numbersRegex = /\d+/g;

function getYIndices(index, length) {
  let start = index > 0 ? index - 1 : 0;
  let end = index + length < STRING_LENGTH ? index + length + 1 : STRING_LENGTH;
  return { start, end };
}

const hasSymbols = (str) => Boolean(str?.split('').some((char) => isNaN(char) && char !== '.'));

function getNeighboringValues(rowIndex, number, row) {
  const forwardIdx = number.index + number[0].length;
  const prevIdx = number.index - 1;

  const forward = row[forwardIdx];
  const prev = row[prevIdx];
  const neighborsHaveSymbols = hasSymbols(prev) || hasSymbols(forward);

  const { start, end } = getYIndices(number.index, number[0].length);
  const above = data[rowIndex - 1]?.slice(start, end);
  const below = data[rowIndex + 1]?.slice(start, end);

  const topFloorHasSymbols = hasSymbols(above);
  const bottomFloorHasSymbols = hasSymbols(below);

  return neighborsHaveSymbols || topFloorHasSymbols || bottomFloorHasSymbols;
}

const sumOfPartNumbers = data.reduce((acc, row, rowIndex) => {
  for (const number of row.matchAll(numbersRegex)) {
    const numValue = Number(number[0]);
    if (getNeighboringValues(rowIndex, number, row)) {
      acc += numValue;
    }
  }
  return acc;
}, 0);

console.log(sumOfPartNumbers);
