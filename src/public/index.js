const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(express.static(path.resolve(__dirname)));

app.listen(process.env.PORT || 3001, console.log("server is up..."));
