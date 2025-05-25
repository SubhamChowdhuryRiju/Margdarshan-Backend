const fs = require("fs").promises;
const path = require("path");

async function getFiles(app) {
  const currentDir = path.join(__dirname, "routes");

  try {
    const files = await fs.readdir(currentDir);

    files
      .filter((file) => file.endsWith(".js"))
      .forEach((file) => {
        const route = require(path.join(currentDir, file));

        if (route && route.path && route.router) {
          app.use(route.path, route.router);
        } else {
          console.warn(`Skipping ${file}: Invalid route export`);
        }
      });
  } catch (err) {
    console.error("Error reading directory:", err);
  }
}

module.exports = getFiles;
