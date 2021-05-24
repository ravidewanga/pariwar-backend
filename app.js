const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
dotenv.config();
require('./app/config/db.config');
const Routes = require("./app/routes/pariwar.routes");

const app = express();
var cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(Routes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});