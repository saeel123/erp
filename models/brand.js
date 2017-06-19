const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/database');

const BrandSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: [true, 'Brand Id is required']
  },
  name: {
    type: String,
    unique: true,
    required: [true, 'Brand name is required'],
    lowercase: true
  },
  description: {
    type: String,
    required: true
  }
});

const Brand = module.exports = mongoose.model('Brand', BrandSchema);

module.exports.addBrand = function (newBrand, callback) {
      newBrand.save(callback);
}
