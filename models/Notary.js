const mongoose = require('mongoose');
const { Schema } = mongoose; //equivalent to const Schema =  mongoose.Schema;

const notarySchema = new Schema({
     civility: String,
     name: String,
     surname: String,
     street: String,
     postalCode: Number,
     city: String,
     phoneNumber: String,
     email: String,
     comment: String,
});

mongoose.model('notaries', notarySchema); //don't do anything if collection already exists if the same.
