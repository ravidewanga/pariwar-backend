var router = require("express").Router();
const post = require("../controller/post.controller");

console.log('route page call');

    router.get('/home',(req,res) =>{
        console.log('Home page called.');
    });
    router.get("/post", post.allposts);
    router.post("/post", post.postsubmit);

module.exports = router;