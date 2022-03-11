//server.js
const app = require('./app');

const PORT = process.env.PORT || 5000; //set the port to the one the host system environment has set. Useful on online web app host like heroku o aws that set dynamically the port with this variable.
app.listen(PORT);
