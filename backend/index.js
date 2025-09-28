// import express, { json } from "express";
// import * as dotenv from "dotenv";
// import loginRoute from "./routes/login.js";
// import dbConnection from "./config/dbconfig.js";
// import taskRoute from "./routes/taskRoute.js";
// import profileRoute from "./routes/profileRoute.js";
// import cors from "cors";

// const app = express();
// console.log("Hi");

// app.use(express.json());
// app.use(cors());

// dotenv.config();

// app.get("/", (req, res) => {
//     res.send("sda");
// });

// app.use("/login", loginRoute);
// app.use("/task", taskRoute);
// app.use("/profile", profileRoute);

// app.listen(5050, () => {
//     dbConnection();
//     console.log(`working at http://localhost:${process.env.PORT}`);
// });

import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Configuration and Database
import dbConnection from "./config/dbconfig.js";

// Routes
import loginRoute from "./routes/login.js";
import taskRoute from "./routes/taskRoute.js";
import profileRoute from "./routes/profileRoute.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

// Fix for ES Modules (__dirname replacement)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Middleware ---
app.use(express.json()); // For parsing application/json
app.use(cors()); // Enable CORS

// --- API Routes ---
// The error is highly likely in one of the files imported below.
app.use("/login", loginRoute);
app.use("/task", taskRoute);
app.use("/profile", profileRoute);

// --- Serve React Frontend (Static Assets) ---
// Note: Assumes the React build folder is one level up from the backend directory.
app.use(express.static(path.join(__dirname, "../frontend/build")));

// --- Catch-all to serve index.html for client-side routing ---
app.get("*", (req, res) => {
    // This handles all routes not caught by the API routes above
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// --- Start Server ---
app.listen(PORT, () => {
    // Connect to the database
    dbConnection();
    console.log(`Server running at http://localhost:${PORT}`);
});
