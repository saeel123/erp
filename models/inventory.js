const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/database');

const InventorySchema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: [true, 'Inventory Id is required']
  },
  product_id: {
    type: String,
    required: [true, 'Product Id is required']
  },
  supplier_id: {
    type: String,
    required: [true, 'Supplier Id is required']
  },
  quantity: {
    type: Number,
    min: 0
  },
  amount: {
    type: Number,
    min: 0
  },
  tax: {
    type: Number,
    min: 0
  },
  total_amount: {
    type: Number,
    min: 0
  },
});

const Inventory = module.exports = mongoose.model('Inventory', InventorySchema);

module.exports.addInventory = function (newInventory, callback) {
      newInventory.save(callback);
}
