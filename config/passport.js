var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    User = require('../models/user'),
    config = require('../config/database');

module.exports = function(passport){
  var opts = {}
  var user;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {

      User.getUserById(jwt_payload._doc._id, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              done(null, user);
              user = user;
          } else {
              done(null, false);
              // or you could create a new account
          }
      });
  }));
}
