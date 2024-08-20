import express from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
import { Employee } from "./models/employModel.js";
import router from "./routes/employeeRoute.js";
import cors from 'cors';

const app = express();
// middleware for parsing

app.use(express.json());

app.get("/", (req, res) => {
    console.log(req);
    return res.status(200).send("Welcome to day one of mern STack development ");
});
// middleware for handling for cors

app.use(cors());

// for routes
app.use('/employee', router);


mongoose
    .connect(mongodbURL)
    .then(() => {
        console.log("Database connection is successfully implemented");
        app.listen(PORT, () => {
            console.log(`App is listening at ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error + "\nSomething is Wrong with connection ");
    });
