const express = require('express');
require('dotenv').config();

const databaseConfig = require('./db.cofig');

const app = express();
const port = process.env.PORT || 3000;

exports.server = async () => {
    try {
        await databaseConfig.dbconnection(); // Wait for the database connection
        app.listen(port, () => console.log('Server listening on port 3000'));
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1); 
    }
};

// const server = async () => {
//     try {
//         await databaseConfig.dbconnection(); // Wait for the database connection
//         app.listen(3000, () => console.log('Server listening on port 3000'));
//     } catch (error) {
//         console.error('Error starting server:', error);
//         process.exit(1); 
//     }
// };