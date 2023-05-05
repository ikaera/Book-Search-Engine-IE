const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/googlebooks');

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/programming-thoughts');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks',
);

module.exports = mongoose.connection;
