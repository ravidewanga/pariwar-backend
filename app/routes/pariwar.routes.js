var router = require("express").Router();
const post = require("../controller/post.controller");
const User = require("../controller/user.controller");
const Auth = require("../controller/auth.controller");

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
    router.post("/post", post.postsubmit);
module.exports = router;