const mongoose = require('mongoose');
require('dotenv').config();

const DB = process.env.MONGODB_URI;

exports.dbconnection = async () => {
  try {
    await mongoose.connect(DB);
    console.log('Successfully connected to database!');
  } catch (err) {
    console.log('Connection not Success!', err);
    throw err;
  }
}
