const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
  if (err) throw err;
  const inputArr = data
    .toString()
    .split('\n')
    .map((line) => line.trim());
  const digitArr = inputArr
    .map((e) => e.replace(/[a-zA-Z]/g, ''))
    .map((digit) => (digit.length > 0 ? Number(digit[0] + digit[digit.length - 1]) : 0));
  // console.log(digitArr);
  // console.log(digitArr.every((e) => typeof e === 'number'));
  // console.log(digitArr.every((e) => e.length > 0));
  // console.log(digitArr[0] + digitArr[1]);

  let result = digitArr.reduce((partialSum, a) => partialSum + a, 0);
  console.log(result);
});
