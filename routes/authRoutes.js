const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../database/database");

const router = express.Router();

// Welcome Page
router.get("/", (req, res) => {
    res.render("index");
});

// Register Page
router.get("/register", (req, res) => {
    res.render("register");
});

// Register User
router.post("/register", async (req, res) => {
    const { college_name, college_address, college_pincode, college_hod } = req.body;

    db.run(
        `INSERT INTO College (college_name, college_address, college_pincode, college_hod) VALUES (?, ?, ?, ?)`,
        [college_name, college_address, college_pincode, college_hod],
        function (err) {
            if (err) return res.send("Error registering. Try again.");
            req.session.college_id = this.lastID;
            res.redirect("/dashboard");
        }
    );
});

// Login Page
router.get("/login", (req, res) => {
    res.render("login");
});

// Login User
router.post("/login", (req, res) => {
    const { college_id } = req.body;

    db.get("SELECT * FROM College WHERE college_id = ?", [college_id], (err, row) => {
        if (err || !row) return res.send("Invalid College ID");
        req.session.college_id = row.college_id;
        res.redirect("/dashboard");
    });
});

// Logout
router.get("/logout", (req, res) => {
    req.session.destroy(() => res.redirect("/"));
});

module.exports = router;
