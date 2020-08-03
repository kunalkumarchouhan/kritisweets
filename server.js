const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const session    = require('express-session');
const passport   = require('passport');
const flash      = require('connect-flash');
const app    = express();
const login  = require('./routes/login');
const signup = require('./routes/signup');
const orders = require('./routes/orders');
const auth   = require('./auth');
if (process.env.NODE_ENV) { require('dotenv').config(); }

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.set("view engine", "ejs");
mongoose.connect(process.env.DATABASE, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}, (error) => { if (error) console.error("Connection Error : " + error); });

const db = mongoose.connection;
db.on('open', () => {
  auth();
  app.use('/login', login);
  app.use('/signup', signup);
  app.use('/order', orders);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/signin', (req, res) => {
  res.sendFile(__dirname + '/views/signin.html');
});

app.get('/shop', (req, res) => {
  res.sendFile(__dirname + '/views/shop.html');
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
