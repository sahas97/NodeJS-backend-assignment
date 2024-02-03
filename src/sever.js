const express = require('express');
const bodyParser = require('body-parser');

const startSever = require('../src/config/index');
const mainRoutes = require('../src/modules/mainRouter');
const errorHandler = require('../src/middleware/error.middleware');

const app = express();

app.use(bodyParser.json()); // application/json

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader(
//         'Access-Control-Allow-Methods',
//         'OPTIONS, GET, POST, PUT, PATCH, DELETE'
//     );
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });

// Middleware to intercept requests to /library and forward to main router
app.use('/library', mainRoutes);

//Middleware to intercept errors
app.use(errorHandler);

startSever.server();
