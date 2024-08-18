import express from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
import { Employee } from "./models/employModel.js";

const app = express();
// middleware for parsing

app.use(express.json());

app.get("/", (req, res) => {
    console.log(req);
    return res.status(200).send("Welcome to day one of mern STack development ");
});
// Setting route for saving a employee

app.post("/employee", async (req, res) => {
    try {
        if (
            !req.body.empName ||
            !req.body.empRole ||
            !req.body.empSalary ||
            !req.body.empNumber
        ) {
            return res.status(400).send({
                message:
                    "Sending all required feilds empName. empRole, empSalary, empNumber",
            });
        }

        const newEmployee = {
            empName: req.body.empName,
            empRole: req.body.empRole,
            empSalary: req.body.empSalary,
            empNumber: req.body.empNumber,
        };

        const employee = await Employee.create(newEmployee);
        return res.status(201).send(employee);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// routes for getting all book
app.get("/employee", async (req, res) => {
    try {
        const employee = await Employee.find({});
        return res.status(201).json({
            count: employee.length,
            data: employee,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});
// get employee details by id

app.get("/employee/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findById(id);
        return res.status(201).json(employee);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});
// route for uptate
app.put("/employee/:id", async (req, res) => {
    try {
        if (
            !req.body.empName ||
            !req.body.empRole ||
            !req.body.empSalary ||
            !req.body.empNumber
        ) {
            return res.status(400).send({
                message:
                    "Sending all required feilds empName. empRole, empSalary, empNumber",
            });
        }
        const { id } = req.params;
        const result = await Employee.findByIdAndUpdate(id, req.body);
        if (!result) {
            return res.status(404).json({ message: "Employee is not found " });
        }

        return res
            .status(200)
            .json({ message: "Employee detail is updated successfully " });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});
// route for deleting a employee detail 
app.delete("/employee/:id", async (req, res) => {
    try {
        
        const { id } = req.params;
        const result = await Employee.findByIdAndDelete(id, req.body);
        if (!result) {
            return res.status(404).json({ message: "Employee is not found " });
        }

        return res
            .status(200)
            .json({ message: "Employee detail is Deleted successfully " });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});


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
