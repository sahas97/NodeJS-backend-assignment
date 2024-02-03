const express = require('express');

const databaseConfig = require('./db.cofig');

const app = express();

exports.server = async () => {
    try {
        await databaseConfig.dbconnection(); // Wait for the database connection
        app.listen(3000, () => console.log('Server listening on port 3000'));
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1); 
    }
};