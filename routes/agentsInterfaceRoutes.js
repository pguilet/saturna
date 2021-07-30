const _ = require('lodash');
const {Path} = require('path-parser');
const {URL}= require('url');
const mongoose=require('mongoose');
const requireLogin=require('../middlewares/requireLogin');
const requireCredits=require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate=require('../services/emailTemplates/surveyTemplate');

const Users = mongoose.model('users');//for testing purpose with node and mongoose we should not get info from Survey.js

module.exports= app =>{
    app.get('/api/allUsers',requireLogin, async (req,res)=>{
        const users = await Users.find().sort({ username: -1 });
        res.send(users);
    });
    


  
};