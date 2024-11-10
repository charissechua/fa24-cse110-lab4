import { Expense } from "../types";
import { Request, Response } from "express";
import { Database } from "sqlite";

export async function createExpenseServer(req: Request, res: Response, db: Database) {

    try {
        // Type casting the request body to the expected format.
        const { id, cost, description } = req.body as { id: string, cost: number, description: string };
 
        if (!description || !id || !cost) {
            return res.status(400).send({ error: "Missing required fields" });
        }
 
        await db.run('INSERT INTO expenses (id, description, cost) VALUES (?, ?, ?);', [id, description, cost]);
        res.status(201).send({ id, description, cost });
 
    } catch (error) {
 
        return res.status(400).send({ error: `Expense could not be created, + ${error}` });
    };
 
 }
  
export async function deleteExpense(id: string, res: Response, db: Database) {
    try {
        await db.run("DELETE * FROM expenses WHERE id == ?", [id]);
        res.status(201).send({ id});
 
    } catch (error) {
 
        return res.status(400).send({ error: `Expense could not be deleted, + ${error}` });
    };
}

export async function getExpenses(req: Request, res: Response, db: Database) {
    try {
        await db.all("SELECT * FROM expenses");
        res.status(201).send();
 
    } catch (error) {
 
        return res.status(400).send({ error: `Expenses could not be fetched, + ${error}` });
    };
}

