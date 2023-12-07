const fs = require('fs');

fs.readFile('input-2-1.txt', (err, data) => {
  if (err) console.log(err);
  console.log((l = data.toString().split`\n`).pop(), [
    (f = l.map((e) =>
      [...e.matchAll`(\\d+) ([rgb])`].reduce((e, r) => ((e[r[2]] = e[r[2]] > r[1] ? e[r[2]] : 0 | r[1]), e), {})
    )).reduce((e, r, _) => e + ((r.r < 13) & (r.g < 14) & (r.b < 15)) * ++_, 0),
    f.reduce((e, r) => e + r.r * r.g * r.b, 0),
  ]);
});
