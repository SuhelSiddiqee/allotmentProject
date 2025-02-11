const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const db = require("./database/database");

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        secret: "secret_key",
        resave: false,
        saveUninitialized: true,
    })
);

// Use Routes
app.use("/", authRoutes);
app.use("/dashboard", dashboardRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
