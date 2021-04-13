module.exports = app => {
    const social_login = require("../controller/social.login.controller.js");

    var router = require("express").Router();

    router.post("/social-login", social_login.socialLogin);
    
    // Create a new Student
    //router.post("/", student.createData);

    // Retrieve all Student
    // router.get("/", student.getAllRecords);

    // // Retrieve all published Student
    // router.get("/published", student.findAllPublished);

    // // Retrieve a single Student with id
    // router.get("/:id", student.findOne);

    // // Update a Student with id
    // router.put("/:id", student.update);

    // // Delete a Student with id
    // router.delete("/:id", student.delete);

    // // Delete all Student
    // router.delete("/", student.deleteAll);

    app.use('/api', router);
};