const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/database');

const SaleInvoiceSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: [true, 'Sale Invoice Id is required']
  },
  sale_id: {
    type: String,
    required: [true, 'Sale id is required'],
  },
  user_id: {
    type: String,
    required: [true, 'User id is required'],
  },
  date: {
    type: Date,
    required: true
  }
});

const SaleInvoice = module.exports = mongoose.model('SaleInvoice', SaleInvoiceSchema);

module.exports.addSaleInvoice = function (newSaleInvoice, callback) {
      newSaleInvoice.save(callback);
}
