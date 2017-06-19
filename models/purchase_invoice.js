const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/database');

const PurchaseInvoiceSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: [true, 'Purchase Invoice Id is required']
  },
  inventory_id: {
    type: String,
    required: [true, 'Inventory Id is required']
  },
  invoice_number: {
    type: String,
    required: [true, 'Invoice num is required'],
    unique: true,
  },
  date: {
    type: Date,
    required: [true, 'Purchase Invoice Date is required'],
  },
  total_amount: {
    type: Number,
    min: 0
  },
  paid_amount: {
    type: Number,
    min: 0
  },
  user_id: {
    type: String,
    required: [true, 'User Id is required'],
    unique: true,
  },
});

const PurchaseInvoice = module.exports = mongoose.model('PurchaseInvoice', PurchaseInvoiceSchema);

module.exports.addPurchaseInvoice = function (newPurchaseInvoice, callback) {
      newSale.save(callback);
}
