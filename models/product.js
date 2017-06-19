const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/database');

const ProductSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: [true, 'Product Id is required']
  },
  name: {
    type: String,
    unique: true,
    required: [true, 'Product name is required'],
    lowercase: true
  },
  description: {
    type: String,
    required: true
  },
  brand_id: {
    type: String,
    required: true
  },
  category_id: {
    type: String,
    required: true
  },
  department_id: {
    type: String,
    required: true
  }
});

const Product = module.exports = mongoose.model('Product', ProductSchema);

module.exports.addProduct = function (newProduct, callback) {
      newProduct.save(callback);
}
