const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const permission = require('permission');

const Product = require('../models/product');
const User = require('../models/user');

const config = require('../config/database');
const uuidv4 = require('uuid/v4');
const Role = 0;
const middleware = require('../middleware.js')(User, Role);

const validation = require('../validations/validations');


router.post('/add', passport.authenticate('jwt', {
  session: false
}), middleware.requireAuthorization, function(req, res, next) {

  var errors = [];

  const brand_id = req.body.brand_id;
  const category_id = req.body.category_id;
  const department_id =  req.body.department_id;

  if (brand_id != undefined && brand_id != "") {
    const found = validation.validateID("Brand", brand_id);

    if (!found) {
        errors.push("Invalid Brand Id");
    }
  } else {
      errors.push("Brand Id required");
  }

  if (category_id != undefined && category_id != "") {
    const found = validation.validateID("Category", category_id);

    if (!found) {
        errors.push("Invalid Category Id");
    }
  } else {
      errors.push("Category Id required");
  }

  if (department_id != undefined && department_id != "") {
    const found = validation.validateID("Department", department_id);

    if (!found) {
        errors.push("Invalid Department Id");
    }
  } else {
      errors.push("Department Id required");
  }

  if (errors.length > 0) {
    res.json({
      success: false,
      msg: errors
    });
  } else {

    let newProduct = new Product({
      id: uuidv4(),
      name: req.body.name,
      description: req.body.description,
      brand_id: req.body.brand_id,
      category_id: req.body.category_id,
      department_id: req.body.department_id,
      tax: req.body.tax
    });

    Product.addProduct(newProduct, function(err, product) {

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
            errors.push("Product name Exist");
          } else {
            errors.push('Failed to add Please check your input');
          }
        }

        res.json({
          success: false,
          msg: errors
        });

      } else {
        res.json({
          success: true,
          msg: "Product Added Successfully"
        });
      }
    });
  }
  
});

module.exports = router;
