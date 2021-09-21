const mongoose = require('mongoose');
const { Schema } = mongoose; //equivalent to const Schema =  mongoose.Schema;

const receiptSchema = new Schema({
     date: Date,
     sent: { type: Boolean, default: false },
     receipt: String,
});

mongoose.model('receipt', receiptSchema); //don't do anything if collection already exists if the same.
