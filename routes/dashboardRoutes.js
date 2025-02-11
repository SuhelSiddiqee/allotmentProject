const express = require("express");
const db = require("../database/database");

const router = express.Router();

// Dashboard - Show College Details
router.get("/", (req, res) => {
    if (!req.session.college_id) return res.redirect("/login");

    db.get("SELECT * FROM College WHERE college_id = ?", [req.session.college_id], (err, college) => {
        if (err) return res.send("Error fetching data.");
        res.render("dashboard", { college });
    });
});

// Add Teacher Form
router.get("/add-teacher", (req, res) => {
    if (!req.session.college_id) return res.redirect("/login");
    res.render("add_teacher");
});

// Add Teacher
router.post("/add-teacher", (req, res) => {
    const { teacher_name, teacher_gender, teacher_phone, teacher_address, teacher_pincode } = req.body;
    db.run(
        `INSERT INTO Teacher (teacher_name, teacher_gender, teacher_phone, college_id, teacher_address, teacher_pincode) VALUES (?, ?, ?, ?, ?, ?)`,
        [teacher_name, teacher_gender, teacher_phone, req.session.college_id, teacher_address, teacher_pincode],
        (err) => {
            if (err) return res.send("Error adding teacher.");
            res.redirect("/dashboard");
        }
    );
});

module.exports = router;
