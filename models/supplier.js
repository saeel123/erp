const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/database');

const SupplierSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: [true, 'Supplier Id is required']
  },
  name: {
    type: String,
  },
  address: {
    type: String,
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
  }
});

const Supplier = module.exports = mongoose.model('Supplier', SupplierSchema);

module.exports.addSupplier = function (newSupplier, callback) {
      newSupplier.save(callback);
}
