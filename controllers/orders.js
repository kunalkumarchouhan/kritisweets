const bcrypt  = require('bcrypt');
const Orders  = require('../models/orders');

const newOrder = (data, callback) => {
  const order = new Orders(data);
  order.save((error, placedOrder) => {
    callback(error, placedOrder);
  });
}

const orderList = callback => {
  Orders.find((error, list) => {
    callback(error, list);
  });
}

const orderDetail = (id, callback) => {
  Orders.findById(id, (error, order) => {
    callback(error, order);
  });
}

module.exports = { newOrder, orderList, orderDetail };
