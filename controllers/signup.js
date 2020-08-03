const bcrypt = require('bcrypt');
const Users  = require('../models/users');

const signup = (username, password, callback) => {
  Users.findOne({ username }, (error, user) => {
    if (error) {
      callback(error);
    }
    if (user) {
      callback("User already exist.");
    }
    else {
      const newUser = new Users({
        username,
        password: bcrypt.hashSync(password, 10)
      });
      newUser.save((error, savedUser) => {
        callback(error, savedUser);
      });
    }
  });
}

module.exports = signup;
