import fs from 'fs';

function getJpegDimensions(filePath) {
  const buf = fs.readFileSync(filePath);
  let i = 2;
  while (i < buf.length) {
    if (buf[i] === 0xff) {
      const marker = buf[i + 1];
      if (marker === 0xc0 || marker === 0xc1 || marker === 0xc2) {
        const height = buf.readUInt16BE(i + 5);
        const width = buf.readUInt16BE(i + 7);
        return { width, height };
      }
      i += 2 + buf.readUInt16BE(i + 2);
    } else {
      i++;
    }
  }
  return null;
}

console.log('cube1:', getJpegDimensions('mp4/cube1.png'));
console.log('cube2:', getJpegDimensions('mp4/cube2.png'));
console.log('cube3:', getJpegDimensions('mp4/cube3.png'));
