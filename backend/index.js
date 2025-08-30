import express, { json } from "express";
import * as dotenv from "dotenv";
import loginRoute from "./routes/login.js";
import dbConnection from "./config/dbconfig.js";
import taskRoute from "./routes/taskRoute.js";
import cors from "cors";

const app = express();
console.log("Hi");

app.use(express.json());
app.use(cors());

dotenv.config();

app.get("/", (req, res) => {
    res.send("sda");
});

app.use("/login", loginRoute);
app.use("/task", taskRoute);

app.listen(5050, () => {
    dbConnection();
    console.log(`working at http://localhost:${process.env.PORT}`);
});
