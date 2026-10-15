const fs = require('fs');
const path = 'apps/frontend/src/pages/Home.tsx';
let content = fs.readFileSync(path, 'utf8');
content = content.replace("No restaurants found", "No items found");
content = content.replace("Try searching for a different cuisine or restaurant name.", "Try searching for a different food item or category.");
fs.writeFileSync(path, content, 'utf8');
