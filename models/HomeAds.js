const mongoose = require('mongoose');
const { Schema } = mongoose; //equivalent to const Schema =  mongoose.Schema;

const homeAdsSchema = new Schema({
     title: String,
     description: String,
     images: [String],
     isLocation: Boolean,
     // googleId: String,
     // role:{type: String, default:Roles.AGENT},
     // credits: {type: Number, default:0}
});

mongoose.model('homeAds', homeAdsSchema); //don't do anything if collection already exists if the same.
