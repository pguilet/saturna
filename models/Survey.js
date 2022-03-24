const mongoose = require('mongoose');
const { Schema } = mongoose; //equivalent to const Schema =  mongoose.Schema;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
     title: String,
     body: String,
     subject: String,
     recipients: [RecipientSchema],
     yes: { type: Number, default: 0 },
     no: { type: Number, default: 0 },
     _user: { type: Schema.Types.ObjectId, ref: 'User' },
     dateSent: Date,
     lastResponded: Date,
});

mongoose.model('surveys', surveySchema); //don't do anything if collection already exists if the same.
