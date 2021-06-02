var router = require("express").Router();
const post = require("../controller/post.controller");
const User = require("../controller/user.controller");
const Auth = require("../controller/auth.controller");
const Group = require("../controller/group.controller");
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const apiVersion = 'v1';


const upload = multer({
    dest: 'images',
    // limits: {
    //     fileSize: 0
    // },
    filename: function (req, file, cb) { 
        cb(null , file.originalname);   
    }

    // fileFilter(req, file, cb) {
    //     if (!file.originalname.match(/\.(jpg|png|jpeg|PNG)$/)) {
    //         return cb(new Error('Please upload a Word document'))
    //     }
    //     cb(undefined, true)
    // }
})


console.log('route page call');
    //auth module
    router.post("/api/v1/user/login", Auth.login);
    router.get("/api/v1/otpverify", Auth.otpVerify);

    //user module
    router.get("/api/v1/user", User.allusers);
    router.post("/api/v1/user/register", User.createUser);
    router.get("/api/v1/unamecheck", User.checkUser);
    router.get("/api/v1/contactcheck", User.checkContact);

    //post module
    router.get("/api/v1/post", post.allposts);
    router.post("/api/v1/post",upload.single('upload'), post.postsubmit);

    //group module
    router.post("/api/v1/group", Group.createGroup);
module.exports = router;