const express = require('express');
const router  = express.Router();
const SignUp  = require('../controllers/signup');
const { verifySignupInputs } = require('../utils/middlewares');

router.post('/', verifySignupInputs, (req, res) => {
  const { username, password } = { ...req.body };
  SignUp(username, password, (error, result) => {
    if (error) {
      res.json({ error });
    }
    else {
      res.json({ result });
    }
  });
});

module.exports = router;