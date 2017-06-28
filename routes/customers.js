const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const permission = require('permission');

const Customer = require('../models/customer');
const User = require('../models/user');

const config = require('../config/database');
const uuidv4 = require('uuid/v4');
const Role = 0;
const middleware = require('../middleware.js')(User, Role);

router.post('/add', passport.authenticate('jwt', {
  session: false
}), middleware.requireAuthorization, function(req, res, next) {

  let newCustomer = new Customer({
    id: uuidv4(),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    address: req.body.address,
    contact: req.body.contact
  });

  Customer.addCustomer(newCustomer, function(err, Customer) {
    var errors = [];

    if (err) {
      if (err.name === 'ValidationError') {
        if (err.errors['id']) {
          errors.push(err.errors['id'].message);
        }
      }
      res.json({
        success: false,
        msg: errors
      });

    } else {
      res.json({
        success: true,
        msg: "Customer Added Successfully"
      });
    }
  });

});

module.exports = router;
