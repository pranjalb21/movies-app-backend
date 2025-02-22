const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGODB;

const initializeDatabase = async () => {
    await mongoose
        .connect(mongoUri)
        .then(() => {
            console.log("Connected to Database");
        })
        .catch((e) => console.log("Error connecting to Database", e));
};
module.exports = { initializeDatabase };
