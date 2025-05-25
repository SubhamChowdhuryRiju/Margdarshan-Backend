const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGO_URI

mongoose.connect(mongoURI);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Mongoose connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});

module.exports = db;