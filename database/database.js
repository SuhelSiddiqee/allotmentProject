const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/allotment.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) console.error(err.message);
    else console.log("Connected to SQLite database.");
});

// Create tables
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS College (
        college_id INTEGER PRIMARY KEY AUTOINCREMENT,
        college_name TEXT NOT NULL,
        college_address TEXT NOT NULL,
        college_pincode TEXT NOT NULL,
        college_hod TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Teacher (
        teacher_id INTEGER PRIMARY KEY AUTOINCREMENT,
        teacher_name TEXT NOT NULL,
        teacher_gender TEXT NOT NULL,
        teacher_phone TEXT NOT NULL,
        college_id INTEGER,
        teacher_address TEXT NOT NULL,
        teacher_pincode TEXT NOT NULL,
        FOREIGN KEY (college_id) REFERENCES College(college_id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Subject (
        subject_id INTEGER PRIMARY KEY AUTOINCREMENT,
        subject_name TEXT NOT NULL,
        subject_semester INTEGER NOT NULL,
        syllabus_type TEXT NOT NULL CHECK(syllabus_type IN ('NEP', 'SEP'))
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Teacher_Specialization (
        spl_id INTEGER PRIMARY KEY AUTOINCREMENT,
        teacher_id INTEGER,
        subject_id INTEGER,
        FOREIGN KEY (teacher_id) REFERENCES Teacher(teacher_id),
        FOREIGN KEY (subject_id) REFERENCES Subject(subject_id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Batches (
        batch_id INTEGER PRIMARY KEY AUTOINCREMENT,
        college_id INTEGER,
        subject_id INTEGER,
        batch_number TEXT NOT NULL,
        num_of_students INTEGER NOT NULL,
        FOREIGN KEY (college_id) REFERENCES College(college_id),
        FOREIGN KEY (subject_id) REFERENCES Subject(subject_id)
    )`);
});

module.exports = db;
