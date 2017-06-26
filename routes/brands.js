const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const permission = require('permission');

const Brand = require('../models/brand');
const User = require('../models/user');
const config = require('../config/database');
const uuidv4 = require('uuid/v4');
const Role = 0;
const middleware = require('../middleware.js')(User, Role);

router.post('/add',passport.authenticate('jwt', {session: false}), middleware.requireAuthorization, function (req, res, next) {

  let newBrand = new Brand({
    id: uuidv4(),
    name: req.body.name,
    description: req.body.description
  });

  Brand.addBrand(newBrand, function (err, brand) {
    var errors = [];

    if (err) {
      if (err.name === 'ValidationError') {

            if (err.errors['name']) {
              errors.push(err.errors['name'].message);
            }

            if (err.errors['id']) {
              errors.push(err.errors['id'].message);
            }

      } else {
        if (err.name === 'MongoError' && err.code === 11000) {
          errors.push("Brand name Exist");
        } else {
          errors.push("Failed to add Please check your input");
        }
      }

      res.json({success: false, msg: errors});

    } else {
      res.json({success: true, msg: "Brand Added Successfully"});
    }
  });

});

module.exports = router;
