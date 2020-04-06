const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()
app.use(cors());
app.use(express.json());
const Port = process.env.PORT; 

const User_mobel = require('./DB_controllers/User_schema');
const Blog_mobel = require('./DB_controllers/Blog_schema');

mongoose.connect('mongodb://localhost/blog_db',{ useUnifiedTopology: true, useNewUrlParser: true ,useCreateIndex: true});
// mongoose.Promise = Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("DB Connection Successful..!");
});

var signup = express.Router();
app.use("/blog",signup);
require("./controllers/signup")(signup,User_mobel)

var singing = express.Router();
app.use('/blog',singing);
require('./controllers/login')(singing,User_mobel,jwt)

var blogs = express.Router();
app.use('/blog',blogs);
require('./controllers/Blog')(blogs,Blog_mobel)

app.listen(Port,() => console.log(`app is runing on port ${Port}`))