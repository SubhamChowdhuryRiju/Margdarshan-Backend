const express = require('express');
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger");
const db = require("./db");
require("dotenv").config();

const rootRoute = require("./routes/root");

const app = express();
const PORT = process.env.PORT;
const SERVER = process.env.SERVER;

app.use("/margdocs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json()); // for parsing application/json

// Load all routes dynamically
require('./routes')(app);

app.use(rootRoute.path, rootRoute.router);


app.listen(PORT, () => {
    console.log(`Swagger-Docs is running on port http://${SERVER}:${PORT}/margdocs`);
    console.log(`Server is running on port http://${SERVER}:${PORT}`);
});

