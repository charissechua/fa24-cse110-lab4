import { Expense } from "../types";
import { Request, Response } from "express";
import { expenses } from "../constants";
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
  
export function deleteExpense(id: string, res: Response, db: Database) {
    console.log("Delete function called with ID:", id);
    
    if (!id) {
        console.log("No ID provided");
        return res.status(400).json({ error: "Missing ID" });
    }

    const expenseIndex = expenses.findIndex(expense => expense.id === id);
    console.log("Found expense at index:", expenseIndex);

    if (expenseIndex === -1) {
        console.log("No expense found with ID:", id);
        return res.status(404).json({ error: "Expense not found" });
    }

    expenses.splice(expenseIndex, 1);
    console.log("Successfully removed expense");
    
    return res.status(200).json({
        message: "Expense deleted successfully",
        newExpenses: expenses
    });
}

export function getExpenses(req: Request, res: Response, db: Database) {
    res.status(200).send({ "data": expenses });
}

