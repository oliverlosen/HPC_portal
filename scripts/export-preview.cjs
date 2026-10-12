/* Creates a portable, one-file preview from the actual frontend sources. */
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, 'dist', file), 'utf8');
const css = read('styles.css');
const scripts = [read('data.js'), read('app.js')].join('\n').replace(/<\/script/gi, '<\\/script');
let html = read('index.html')
  .replace('  <link rel="stylesheet" href="styles.css">', '<style>\n' + css + '\n</style>')
  .replace('  <script src="data.js" defer></script>', '')
  .replace('  <script src="app.js" defer></script>', '')
  .replace('  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">', '')
  .replace('</body>', '<script>\n' + scripts + '\n</script>\n</body>');
const directory = path.join(root, 'preview');
fs.mkdirSync(directory, { recursive: true });
const output = path.join(directory, 'HPC_Cliente_Mockup.html');
fs.writeFileSync(output, html, 'utf8');
console.log(JSON.stringify({preview: output, bytes: Buffer.byteLength(html)}));
