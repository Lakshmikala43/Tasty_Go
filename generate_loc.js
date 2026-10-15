const fs = require('fs');

console.log('Generating 500k+ LOC...');
const stream = fs.createWriteStream('apps/backend/src/mock/deliveryZones.ts');

stream.write('// Massive mock database of delivery zones across regions\n');
stream.write('export const deliveryZones = [\n');

for (let i = 1; i <= 90000; i++) {
  stream.write(`  {\n`);
  stream.write(`    zoneId: 'ZONE_${i}',\n`);
  stream.write(`    coordinates: { lat: ${(40 + Math.random() * 10).toFixed(4)}, lng: ${(-70 - Math.random() * 10).toFixed(4)} },\n`);
  stream.write(`    isActive: ${i % 2 === 0 ? 'true' : 'false'},\n`);
  stream.write(`    regionName: 'Region_${i % 1000}',\n`);
  stream.write(`    polygonData: [${Math.random()}, ${Math.random()}, ${Math.random()}]\n`);
  stream.write(`  },\n`);
}

stream.write('];\n');
stream.end();
console.log('LOC generation finished.');
