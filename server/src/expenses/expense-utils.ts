import { Expense } from "../types";
import { Request, Response } from "express";
import { Database } from "sqlite";

export async function createExpenseServer(req: Request, res: Response, db: Database) {

            // Type casting the request body to the expected format.
    const { id, cost, description } = req.body;
    console.log(req.body);
    
    if (!description || !id || !cost) {

        return res.status(400).send({ error: "Missing required fields" });
    }
    try {
        await db.run('INSERT INTO expenses (id, description, cost) VALUES (?, ?, ?);', [id, description, cost]);
        console.log('success');
 
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: `Expense could not be created, + ${error}` });
    };

    res.status(201).send({ id, description, cost });
 
 }
  
export async function deleteExpense(id: string, res: Response, db: Database) {

    if (!id) {
        return res.status(400).send({ error: "Missing required fields" });
    }


    try {
        const result = await db.run("DELETE FROM expenses WHERE id == ?;", [id]);

        if (result.changes === 0) {
            return res.status(400).send({ error: "Expense not found" });
        }
        res.status(201).send({ message: "Expense deleted successfully" });
 
    } catch (error) {

        return res.status(500).send({ error: `Expense could not be deleted, + ${error}` });
    };
}

export async function getExpenses(req: Request, res: Response, db: Database) {
    try {
        const expenseCurr = await db.all("SELECT * FROM expenses;");
        res.status(201).send({ data: expenseCurr });
 
    } catch (error) {
 
        return res.status(400).send({ error: `Expenses could not be fetched, + ${error}` });
    };
}

