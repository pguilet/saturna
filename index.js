const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');// no need of a variable because the file does not export anything
var flash = require('connect-flash');

mongoose.connect(keys.mongoURI,{ useNewUrlParser: true,useUnifiedTopology: true });
const app = express();

//Set middlewares used before incoming requests.
app.use(express.json());
app.use(cookieSession({
  maxAge: 30 *24 *60*60*1000,//30 days before expire
  keys:[keys.cookieKey]//an array to add many keys that will be chosen randomly when creating the cookie instead of just one.
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());


require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);


if(process.env.NODE_ENV==='production'){
  // express will serve up production assets like our mains.js file built from npm run build or main.css file.
  app.use(express.static('client/build'));
  // Express will serve up the index.html file if it doesnt recognize the route.
  const path = require('path');
  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  });
}





const PORT = process.env.PORT || 5000; //set the port to the one the host system environment has set. Useful on online web app host like heroku o aws that set dynamically the port with this variable.
app.listen(PORT);
