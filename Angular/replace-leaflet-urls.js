const fs = require('fs');
const path = require('path');

// Path to your leaflet.css
const leafletCssPath = path.join(__dirname, 'node_modules', 'leaflet', 'dist', 'leaflet.css');

// Read the leaflet.css file
let cssContent = fs.readFileSync(leafletCssPath, 'utf-8');

// Remove any line that contains 'url(' (including the url and the whole line)
cssContent = cssContent.split('\n')
  .filter(line => !line.includes('url('))  // Remove lines containing 'url('
  .join('\n');

// Write the modified content back to leaflet.css
fs.writeFileSync(leafletCssPath, cssContent);

console.log('leaflet.css lines containing "url(" have been removed!');
