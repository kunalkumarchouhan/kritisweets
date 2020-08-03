const { isUsername, isObjectID } = require('./verify.js');

const verifyLoginInputs = (req, res, next) => {
  const username = req.body.username;
  if (isUsername(username)) {
    next();
  }
  else {
    res.json({ error: "Invalid Username." });
  }
}

const verifySignupInputs = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const errors = {};
  if (!isUsername(username)) {
    errors.username = "Invalid Username.";
  }
  if (password === "") {
    errors.password = "Password require.";
  }
  if (Object.keys(errors).length === 0) {
    next();
  }
  else {
    res.json({ errors });
  }
}

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  }
  else {
    res.redirect('/');
  }
}

const verifyId = (req, res, next) => {
  if (isObjectID(req.params.order)) {
    next();
    return;
  }
  res.json({ error: "Order Not Found" });
}

module.exports = { verifyLoginInputs, verifySignupInputs, ensureAuthenticated, verifyId };
