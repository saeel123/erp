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
  },
  status: {
    type: Boolean,
    default: 1
  }
});

const Category = module.exports = mongoose.model('Category', CategorySchema);

module.exports.addCategory = function (newCategory, callback) {
      newCategory.save(callback);
}

module.exports.getCategoryById = function (id, callback) {
  const query = {id: id}
  Category.findOne(query, callback);
}

module.exports.deleteCategory = function (category, callback) {
  const query = { $set: {status: 0}};
  category.update(query, callback);
}
