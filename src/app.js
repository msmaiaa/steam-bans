require("dotenv").config();

const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 5000;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

require("./config/steam")(app);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));