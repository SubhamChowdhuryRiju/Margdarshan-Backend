const fs = require('fs');

// Get the current folder
const currentDir = __dirname;

// Read all file names in the current folder
fs.readdir(currentDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files
    .filter(file => file.endsWith('.js') && file !== 'node_modules') // only .js files
    .forEach(file => {
      console.log(file);
    });
});
