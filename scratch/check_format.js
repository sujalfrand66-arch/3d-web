import fs from 'fs';
const buf = fs.readFileSync('mp4/cube1.png');
console.log('Hex signature:', buf.slice(0, 16).toString('hex'));
console.log('ASCII signature:', buf.toString('ascii', 0, 16));
