const mongoose = require('mongoose');
const { Schema } = mongoose; //equivalent to const Schema =  mongoose.Schema;
const Roles = require('../types/types.js');

const userSchema = new Schema({
  username:String,
  password:String,
  googleId: String,
  role:{type: String, default:Roles.AGENT},
  credits: {type: Number, default:0}
});

mongoose.model('users', userSchema);//don't do anything if collection already exists if the same.