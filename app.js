const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger");
const loadRoutes = require("./routes");
const db = require("./db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
const SERVER = process.env.SERVER;

app.use("/margdocs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json()); // for parsing application/json

// Interate over all routes
loadRoutes(app);

app.listen(PORT, () => {
  console.log(
    `Swagger-Docs is running on port http://${SERVER}:${PORT}/margdocs`
  );
  console.log(`Server is running on port http://${SERVER}:${PORT}`);
});
