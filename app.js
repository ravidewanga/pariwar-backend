const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require('./app/model/user.model');
const Router = require('express').Router(); 

const app = express();
app.use(Router);
mongoose.connect('mongodb+srv://admin:00rah0ul@pariwardb.k3kiw.mongodb.net/pariwar?retryWrites=true&w=majority', 
{useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we\'re connected!');
});

Router.get('/',(req,res,next) => {
    console.log('this is get method');
});


Router.post('/',(req,res) => {
    console.log('req-------------------------',req);
    console.log('req body-------------------------',req.body);

    const user = new User({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        age : req.body.age
    });
    user.save().then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});