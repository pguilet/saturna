const mongoose = require('mongoose');
const { Schema } = mongoose; //equivalent to const Schema =  mongoose.Schema;

const syndicSchema = new Schema({
     name: String,
     street: String,
     postalCode: Number,
     city: String,
     phoneNumber: String,
     email: String,
     comment: String,
});

mongoose.model('syndics', syndicSchema); //don't do anything if collection already exists if the same.
