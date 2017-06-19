const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/database');

const CustomerSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: [true, 'Customer Id is required']
  },
  first_name: {
    type: String,
    lowercase: true
  },
  last_name: {
    type: String,
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
  }
});

const Customer = module.exports = mongoose.model('Customer', CustomerSchema);

module.exports.addCustomer = function (newCustomer, callback) {
      newCustomer.save(callback);
}
