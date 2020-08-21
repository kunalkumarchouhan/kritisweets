const express = require('express');
const router  = express.Router();
const { newOrder, orderList, orderDetail }  = require('../controllers/orders');
const { sendConfirmation } = require('../controllers/message');
const { verifyId, ensureAuthenticated } = require('../utils/middlewares');

router.post('/new', (req, res) => {
  newOrder(req.body, (error, order) => {
    if (error) {
      res.json({ error });
    }
    else {
      const { _id, items, phone } = order;
      const price = items.map(({quantity, pricePerUnit}) => quantity * pricePerUnit).reduce((a,b) => a+b);
      sendConfirmation(phone, _id, price, (error, result) => { console.log("New Order Received"); });
      const io = req.app.get('io');
      io.emit('neworder', _id);
      res.json({ order });
    }
  });
});

router.get('/list', ensureAuthenticated, (req, res) => {
  orderList((error, list) => {
    if (error) {
      res.json({ error });
      return;
    }
    res.render('../views/orders.ejs', {list});
  });
});

router.get('/:order', verifyId, (req, res) => {
  const orderID = req.params.order;
  orderDetail(orderID, (error, order) => {
    if (error) {
      res.json({ error })
    }
    else if (order) {
      const {name, phone, address, items, _id } = order;
      const price = items.map(({quantity, pricePerUnit}) => quantity * pricePerUnit).reduce((a,b) => a+b);
      const total = price >= 200 ? price : price + 20;
      res.render('../views/order.ejs', {name, phone, address, items, total, _id });
    }
    else {
      res.json({ error: "Order Not Found." });
    }
  });
});

module.exports = router;
