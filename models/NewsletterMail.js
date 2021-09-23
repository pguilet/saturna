const mongoose = require('mongoose');
const { Schema } = mongoose; //equivalent to const Schema =  mongoose.Schema;
const Roles = require('../types/types.js');

const newsletterMailSchema = new Schema({
     name: String,
     newsletterSuscribing: { type: Boolean, default: false },
     profilInvest: { type: Boolean, default: false },
     profilRent: { type: Boolean, default: false },
     profilOwner: { type: Boolean, default: false },
     lastSendingDate: Date,
     mailContent: String,
     object: String,
     comment: String,
     lastClientsBatch: Number,
});

mongoose.model('newsletterMail', newsletterMailSchema); //don't do anything if collection already exists if the same.
