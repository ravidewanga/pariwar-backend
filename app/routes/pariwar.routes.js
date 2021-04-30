var router = require("express").Router();
const post = require("../controller/post.controller");
const User = require("../controller/user.controller");

console.log('route page call');

    router.get('/home',(req,res) =>{
        console.log('Home page called.');
    });
    router.get("/user", User.allusers);
    router.post("/user", User.createUser);

    router.get("/post", post.allposts);
    router.post("/post", post.postsubmit);
module.exports = router;