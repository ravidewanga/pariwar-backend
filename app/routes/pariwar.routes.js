var router = require("express").Router();
const post = require("../controller/post.controller");
const User = require("../controller/user.controller");
const Auth = require("../controller/auth.controller");

console.log('route page call');

    router.get('/home',(req,res) =>{
        console.log('Home page called.');
    });

    //auth module
    router.post("/login", Auth.login);

    //user module
    router.get("/user", User.allusers);
    router.post("/user", User.createUser);

    //post module
    router.get("/post", post.allposts);
    router.post("/post", post.postsubmit);
module.exports = router;