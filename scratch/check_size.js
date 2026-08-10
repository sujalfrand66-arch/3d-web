import fs from 'fs';

function getPngDimensions(filePath) {
  const buffer = fs.readFileSync(filePath);
  if (buffer.toString('ascii', 1, 4) !== 'PNG') {
    throw new Error('Not a valid PNG');
  }
  const width = buffer.readInt32BE(16);
  const height = buffer.readInt32BE(20);
  return { width, height };
}

console.log('cube1:', getPngDimensions('mp4/cube1.png'));
console.log('cube2:', getPngDimensions('mp4/cube2.png'));
console.log('cube3:', getPngDimensions('mp4/cube3.png'));
