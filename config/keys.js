//logic cannot be executed with es 2015 module using export default and import from like we do here with the if. It only works with default require.

if (process.env.NODE_ENV === 'production') {//variable set by heroku. See its documentation.
  //we are in production
  module.exports = require('./prod');
} else {
  //we are in developpement.
  module.exports = require('./dev');
}
