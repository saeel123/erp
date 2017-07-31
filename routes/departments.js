const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const permission = require('permission');

const Department = require('../models/department');
const User = require('../models/user');

const config = require('../config/database');
const uuidv4 = require('uuid/v4');
const Role = 0;
const middleware = require('../middleware.js')(User, Role);

router.post('/add', passport.authenticate('jwt', {
  session: false
}), middleware.requireAuthorization, function(req, res, next) {

  let newDepartment = new Department({
    id: uuidv4(),
    name: req.body.name,
    address: req.body.description,
    contact: req.body.contact,
    tin: req.body.tin,
    pan: req.body.pan
  });

  Department.addDepartment(newDepartment, function(err, department) {
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
          errors.push("Dapartment name Exist");
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
        msg: "Department Added Successfully"
      });
    }
  });

});

router.put('delete/:id', function (req, res, next) {
  var id = req.params.id;

  if (id) {
    Department.getDepartmentById(id, function (err, department) {
      if (err) {
        res.json({
          success: false,
          msg: "No department available with this ID"
        });
      } else {
        if (department.status === true) {
          Department.deleteDepartment(department, function (err, department) {
            if (err) {
              res.json({
                success: true,
                msg: "Failed to delete Department"
              });
            } else {
              res.json({
                success: true,
                msg: "Department Deleted Successfully"
              });
            }
          });
        } else {
          res.json({
            success: false,
            msg: "Department Deleted Already"
          });
        }
      }
    });
  } else {
    res.json({
      success: false,
      msg: "No Department available with this ID"
    });
  }
});


router.get('/', passport.authenticate('jwt', {session: false}), function (req, res, next) {
    Department.getAllDepartments(function (err, departments) {

      if (err) {
        res.json({
          success: false,
          msg: "Error Occured while fetching"
        });
      } else if (departments) {

        const departmentsArray = [];

        for (var i = 0; i < departments.length; i++) {
          const departmentObj = Department.tailorDepartmentObj(departments[i]);
          departmentsArray.push(departmentObj);
        }

        res.json({
          success: true,
          msg: "Departments Fetched Successfully",
          data: departmentsArray
        });
      } else {
        res.json({
          success: false,
          msg: "No Departments Available."
        });
      }
    });
});

router.get('/:id', passport.authenticate('jwt', {session: false}), function (req, res, next) {
    var id = req.params.id;

    Department.getDepartmentId(id,function (err, department) {
      if (err) {
        res.json({
          success: false,
          msg: "Error Occured while fetching"
        });
      } else if (department) {

        const departmentObj =  Department.tailorDepartmentObj(department)

        res.json({
          success: true,
          msg: "Department Fetched Successfully",
          data: departmentObj
        });
      } else {
        res.json({
          success: false,
          msg: "No Department Available."
        });
      }
    });
});


module.exports = router;
