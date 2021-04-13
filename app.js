const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/model/index");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync();

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the node js application." });
});

require("./app/routes/pariwar.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});