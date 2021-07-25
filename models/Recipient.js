const mongoose = require('mongoose');
const { Schema } = mongoose; //equivalent to const Schema =  mongoose.Schema;

const recipientSchema = new Schema({
    email: String,
    responded:{type:Boolean, default:false}
});
module.exports=recipientSchema;