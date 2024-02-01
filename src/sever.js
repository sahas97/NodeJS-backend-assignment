const express = require("express");

const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

//express ruuter
// app > mainrouter

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_HOST);
        console.log("Connected to MongoDB successfully");

        app.listen(3000, () => console.log("Server running on port 3000"));
    } catch (err) {
        console.error("Errorconecting to MongoDB", err);
    }
};

connectDB();
// mongoose.connect('mongodb+srv://uthpalasahas:zHQ1nYmZ1UFBPksv@cluster0.kf2jxfl.mongodb.net/library?retryWrites=true&w=majority').then(result => {
//     app.listen(3000);
// }).catch(err => console.log(err));
