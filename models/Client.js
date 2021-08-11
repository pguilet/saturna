const mongoose = require('mongoose');
const { Schema } = mongoose; //equivalent to const Schema =  mongoose.Schema;
const Roles = require('../types/types.js');

const clientSchema = new Schema({
     civility: String,
     name: String,
     name2: String,
     name3: String,
     surname: String,
     womenSurname: String,
     birthday: Date,
     street: String,
     postalCode: Number,
     city: String,
     familySituation: String,
     childNumber: Number,
     job: String,
     salary: Number,
     phoneNumber: String,
     email: String,
     newsletterSuscribing: { type: Boolean, default: false },
     profilInvest: { type: Boolean, default: false },
     profilRent: { type: Boolean, default: false },
     profilOwner: { type: Boolean, default: false },
     comment: String,
});

mongoose.model('clients', clientSchema); //don't do anything if collection already exists if the same.
