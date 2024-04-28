const mongoose = require('mongoose');
require('dotenv').config();

function connectToMongo() {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log('connected to mongoDB'))
    .catch((error) =>
      console.log('error connecting to MongDB: ', error.message)
    );
}

module.exports = connectToMongo;
