import { Request, Response } from "express";
import { createBudgetEndpoints } from "./budget/budget-endpoints";
import { createExpenseEndpoints } from "./expenses/expense-endpoints";
import { budget } from "./constants";
import initDB from "./createTable";

const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// Initialize the database and start the server
(async () => {
    const db = await initDB();

    // Root endpoint to get test if the server is running
    app.get("/", (req: Request, res: Response) => {
        res.status(200).send({ "data": "Hello, TypeScript Express!" });
    });

    createExpenseEndpoints(app, db);
    createBudgetEndpoints(app, budget);

    // Start the server inside the async function after routes are set up
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
})();