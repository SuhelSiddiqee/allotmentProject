CREATE DATABASE ExamAllotment;
USE ExamAllotment;

-- College Table
CREATE TABLE College (
    college_id INT PRIMARY KEY AUTO_INCREMENT,
    college_name VARCHAR(255) NOT NULL,
    college_address TEXT NOT NULL,
    college_pincode VARCHAR(10),
    college_hod VARCHAR(255)
);

-- Teacher Table
CREATE TABLE Teacher (
    teacher_id INT PRIMARY KEY AUTO_INCREMENT,
    teacher_name VARCHAR(255) NOT NULL,
    teacher_gender ENUM('Male', 'Female', 'Other'),
    teacher_phone VARCHAR(15) UNIQUE,
    college_id INT,
    teacher_address TEXT,
    teacher_pincode VARCHAR(10),
    FOREIGN KEY (college_id) REFERENCES College(college_id) ON DELETE SET NULL
);

-- Subject Table
CREATE TABLE Subject (
    subject_id INT PRIMARY KEY AUTO_INCREMENT,
    subject_name VARCHAR(255) NOT NULL,
    subject_semester INT NOT NULL,
    nep_sep_syllabus is_sep TINYINT(1)
);

-- Batches Table
CREATE TABLE Batches (
    batch_id INT PRIMARY KEY AUTO_INCREMENT,
    college_id INT,
    subject_id INT,
    batch_number VARCHAR(50),
    num_students INT,
    FOREIGN KEY (college_id) REFERENCES College(college_id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES Subject(subject_id) ON DELETE CASCADE
);

-- Theory Exam Specialization Table
CREATE TABLE Theory_Exam_Specialization (
    spl_id INT PRIMARY KEY AUTO_INCREMENT,
    teacher_id INT,
    subject_id INT,
    FOREIGN KEY (teacher_id) REFERENCES Teacher(teacher_id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES Subject(subject_id) ON DELETE CASCADE
);

-- Practical Exam Specialization Table
CREATE TABLE Practical_Exam_Specialization (
    spl_id INT PRIMARY KEY AUTO_INCREMENT,
    teacher_id INT,
    subject_id INT,
    FOREIGN KEY (teacher_id) REFERENCES Teacher(teacher_id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES Subject(subject_id) ON DELETE CASCADE
);

