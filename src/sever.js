const express = require('express');

const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB successfully');

        app.listen(3000, () => console.log('Server running on port 3000'));

    } catch (err) {
        console.error('Error conecting to MongoDB', err);
    }
};

connectDB();
