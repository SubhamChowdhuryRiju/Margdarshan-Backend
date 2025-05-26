// Routes
const root = require("./routes/root");
const addition = require("./routes/addition");
const user = require("./routes/user");
const notFound = require("./routes/404Error");

const routes = [root, addition, user];

// Load all routes
async function loadRoutes(app) {
  routes.forEach((route) => {
    app.use(route.path, route.router);
  });
  app.use("/", notFound);
}

module.exports = loadRoutes;
