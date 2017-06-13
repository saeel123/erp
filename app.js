const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//db connection
mongoose.connect(config.database);

//on connection
mongoose.connection.on('connected', function () {
  console.log("connected to " + config.database);
});

const app = express();
const PORT = 8080 || process.env.PORT;

const users = require('./routes/users');

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

//index routes
app.get('/', function (req, res) {
  res.send("hello world");
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

//start express server
app.listen(PORT, function () {
  console.log("server started on port "+ PORT );
});
