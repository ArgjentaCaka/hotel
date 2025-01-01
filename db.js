const mongoose = require('mongoose');
var mongoURL = 'mongodb+srv://elzakrasniqi2:Mongo123.@cluster0.mwxtd.mongodb.net/mern-rooms'

mongoose.connect('mongodb+srv://elzakrasniqi2:Mongo123.@cluster0.mwxtd.mongodb.net/mern-rooms', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error: ', err); // Ky log do t'ju tregojë nëse ka gabime lidhjeje
  });


module.exports = mongoose