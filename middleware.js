module.exports = function (user, role) {

  return{
    requireAuthorization: function (req, res, next) {
      console.log(role);
      if (req.user && req.user.type === role) {
          next();
      } else {
          res.json({success: false, msg: "User Unauthorised"});
      }
    }
  };
};
