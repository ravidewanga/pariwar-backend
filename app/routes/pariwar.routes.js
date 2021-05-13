var router = require("express").Router();
const post = require("../controller/post.controller");
const User = require("../controller/user.controller");
const Auth = require("../controller/auth.controller");
const multer = require('multer');
const fs = require('fs');
const path = require('path');


const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('Please upload a Word document'))
        }
        cb(undefined, true)
    }
})


console.log('route page call');
    //auth module
    router.post("/api/v1/user/login", Auth.login);
    router.post("/otpverify", Auth.otpVerify);

    //user module
    router.get("/user", User.allusers);
    router.post("/api/v1/user/register", User.createUser);
    router.get("/api/v1/user/check", User.checkUser);

    //post module
    router.get("/post", post.allposts);
    router.post("/post",upload.single('upload'), post.postsubmit);
module.exports = router;