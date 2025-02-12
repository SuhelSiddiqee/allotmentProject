const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const axios = require("axios");
const db = require("./database/database");
const genAIService = require("./services/genAIService");

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json()); // Add this line

app.use(bodyParser.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());

app.use(
    session({
        secret: "secret_key",
        resave: false,
        saveUninitialized: true,
    })
);

let storedContent = "";

// Fetch and store GitHub content on server startup
const githubUrl = "https://raw.githubusercontent.com/GitKaran4723/unidata/refs/heads/main/data.txt"; // Replace with actual URL
axios.get(githubUrl)
    .then(response => {
        storedContent = response.data;
        console.log("GitHub content loaded successfully");
    })
    .catch(error => {
        console.error("Error fetching GitHub content:", error);
    });

// API to process user questions using stored content
app.post("/ask-gemini", async (req, res) => {
    console.log("Got request", req.body.question);
    try {
        const userQuestion = req.body.question;
        if (!userQuestion) {
            return res.status(400).json({ error: "Question is required" });
        }

        // Process user question with stored content using GenAI service
        const responseText = await genAIService.processQuestion(storedContent, userQuestion);
        res.json({ response: responseText });
    } catch (error) {
        console.error("Error processing user question:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Use Routes
app.use("/", authRoutes);
app.use("/dashboard", dashboardRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
