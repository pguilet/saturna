const Roles = require('../types/types.js');

module.exports = (req, res, next) => {
     if (!req.user || req.user.role !== Roles.ADMIN) {
          return res
               .status(401)
               .send({
                    error: 'you must log in with an account with admin rights!',
               });
     }
     next();
};
