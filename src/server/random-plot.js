const fs = require('fs');

const plots = JSON.parse(fs.readFileSync('plots.json', 'utf8'));

const random = plots[Math.floor(Math.random()*plots.length)];

console.log(random);
