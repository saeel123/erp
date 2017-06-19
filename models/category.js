const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/database');

//category schema
const CategorySchema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: [true, 'Category Id is required']
  },
  name: {
    type: String,
    unique: true,
    required: [true, 'Category name is required'],
    lowercase: true
  },
  description: {
    type: String,
    required: true
  }
});

const Category = module.exports = mongoose.model('Category', CategorySchema);

module.exports.addCategory = function (newCategory, callback) {
      newCategory.save(callback);
}