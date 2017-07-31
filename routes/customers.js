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

router.get('/', passport.authenticate('jwt', {session: false}), function (req, res, next) {
    Customer.getAllCustomer(function (err, customers) {

      if (err) {
        res.json({
          success: false,
          msg: "Error Occured while fetching"
        });
      } else if (customers) {
        const customersArray = [];

        for (var i = 0; i < customers.length; i++) {
          const customerObj = Customer.tailorCustomerObj(customers[i]);
          customersArray.push(customerObj);
        }

        res.json({
          success: true,
          msg: "Customers Fetched Successfully",
          data: customersArray
        });
      } else {
        res.json({
          success: false,
          msg: "No Customers Available."
        });
      }
    });
});

router.get('/:id', passport.authenticate('jwt', {session: false}), function (req, res, next) {
    var id = req.params.id;

    Customer.getCustomerById(id,function (err, customer) {
      if (err) {
        res.json({
          success: false,
          msg: "Error Occured while fetching"
        });
      } else if (customer) {

        const customerObj =  Customer.tailorCustomerObj(customer)

        res.json({
          success: true,
          msg: "Customer Fetched Successfully",
          data: customerObj
        });
      } else {
        res.json({
          success: false,
          msg: "No Customer Available."
        });
      }
    });
});




module.exports = router;
