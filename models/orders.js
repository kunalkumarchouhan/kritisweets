const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const items = new Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  pricePerUnit: {
    type: Number,
    required: true
  }
});

const orders = new Schema({
  items: [ items ],
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Orders', orders);
