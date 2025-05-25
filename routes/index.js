const fs = require('fs');
const path = require('path');

module.exports = (app) => {
  const currentDir = __dirname;

  fs.readdir(currentDir, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    files
      .filter(file => file.endsWith('.js') && file !== 'index.js')
      .forEach(file => {
        const route = require(path.join(currentDir, file));

        if (route && route.path && route.router) {
          app.use(route.path, route.router);
        } else {
          console.warn(`Skipping ${file}: Invalid route export`);
        }
      });
  });
};
