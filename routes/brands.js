const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const permission = require('permission');

const Brand = require('../models/brand');
const User = require('../models/user');
const config = require('../config/database');


router.post('/add', passport.authenticate('jwt', {session: false}), function (req, res, next) {

  console.log(req.user);

  let newBrand = new Brand({
    name: req.body.name,
    description: req.body.description
  });

  Brand.addBrand(newBrand, function (err, brand) {

    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
       res.json({success: false, msg: "Brand name already exist" });
     } else {
       res.json({success: false, msg: "Failed to Add Brand. " + err.errors['name'].message });
     }
    } else {
      res.json({success: true, msg: "Brand Added Successfully"});
    }
  });

});

module.exports = router;
