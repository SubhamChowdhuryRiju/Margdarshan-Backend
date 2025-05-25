const swaggerJSDocs = require("swagger-jsdoc")

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Margdarshan API",
            version: "2.0.2",
            description: "API documentation for Margdarshan",
        },
    },
    apis: ["./routes/*.js", "./app.js"],
}

const specs = swaggerJSDocs(options)

module.exports = specs