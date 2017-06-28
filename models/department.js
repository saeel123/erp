const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/database');

const DepartmentSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: [true, 'Department Id is required']
  },
  name: {
    type: String,
    unique: true,
    required: [true, 'Department name is required'],
    lowercase: true
  },
  address: {
    type: String,
    lowercase: true
  },
  contact: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: '{VALUE} is not a valid phone number!'
    }
  },
  tin: {
    type: String,
    lowercase: true
  },
  pan: {
    type: String,
    lowercase: true
  },
  status: {
    type: Boolean,
    default: 1
  }
});

const Department = module.exports = mongoose.model('Department', DepartmentSchema);

module.exports.addDepartment = function (newDepartment, callback) {
      newDepartment.save(callback);
}

module.exports.getDepartmentById = function (id, callback) {
  const query = {id: id}
  Department.findOne(query, callback);
}

module.exports.deleteDepartment = function (department, callback) {
  const query = { $set: {status: 0}};
  department.update(query, callback);
}
