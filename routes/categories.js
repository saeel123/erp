const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const permission = require('permission');

const Category = require('../models/category');
const User = require('../models/user');
const config = require('../config/database');
const uuidv4 = require('uuid/v4');
const Role = 0;
const middleware = require('../middleware.js')(User, Role);

router.post('/add', passport.authenticate('jwt', {
  session: false
}), middleware.requireAuthorization, function(req, res, next) {

  let newCategory = new Category({
    id: uuidv4(),
    name: req.body.name,
    description: req.body.description
  });

  Category.addCategory(newCategory, function(err, category) {
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
          errors.push("Category name Exist");
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
        msg: "Category Added Successfully"
      });
    }
  });

});

router.put('delete/:id', function (req, res, next) {
  var id = req.params.id;

  if (id) {
    Category.getCategoryById(id, function (err, category) {
      if (err) {
        res.json({
          success: false,
          msg: "No Category available with this ID"
        });
      } else {

        if (category.status === true) {
          Category.deleteCategory(category, function (err, category) {
            if (err) {
              res.json({
                success: true,
                msg: "Failed to delete Category"
              });
            } else {
              res.json({
                success: true,
                msg: "Category Deleted Successfully"
              });
            }
          });
        } else {
          res.json({
            success: false,
            msg: "Category Deleted Already"
          });
        }
      }
    });
  } else {
    res.json({
      success: false,
      msg: "No Category available with this ID"
    });
  }
});


router.get('/', passport.authenticate('jwt', {session: false}), function (req, res, next) {
    Category.getAllCategories(function (err, categories) {

      if (err) {
        res.json({
          success: false,
          msg: "Error Occured while fetching"
        });
      } else if (categories) {

        const categoriesArray = [];

        for (var i = 0; i < categories.length; i++) {
          const categoryObj = Category.tailorCategoryObj(categories[i]);
          categoriesArray.push(categoryObj);
        }
        
        res.json({
          success: true,
          msg: "Categories Fetched Successfully",
          data: categoriesArray
        });
      } else {
        res.json({
          success: false,
          msg: "No Categories Available."
        });
      }
    });
});

router.get('/:id', passport.authenticate('jwt', {session: false}), function (req, res, next) {
    var id = req.params.id;

    Category.getCategoryId(id,function (err, category) {
      if (err) {
        res.json({
          success: false,
          msg: "Error Occured while fetching"
        });
      } else if (category) {

        const categoryObj =  Category.tailorCategoryObj(category)

        res.json({
          success: true,
          msg: "Category Fetched Successfully",
          data: categoryObj
        });
      } else {
        res.json({
          success: false,
          msg: "No Category Available."
        });
      }
    });
});




module.exports = router;
