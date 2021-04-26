module.exports = app => {
    const login = require("../controller/login.controller.js");

    var router = require("express").Router();

    router.post("/social-login", login.socialLogin);
    router.post("/login", login.customLogin);
    app.use('/api', router);
};