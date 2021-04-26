const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require('./app/model/user.model');
const { Router } = require("express");

const app = express();

mongoose.connect('mongodb+srv://admin:00rah0ul@pariwardb.k3kiw.mongodb.net/pariwar?retryWrites=true&w=majority', 
{useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we\'re connected!');
});

Router.post('/',(req,res,next) => {
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