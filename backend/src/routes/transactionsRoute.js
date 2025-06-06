import express from 'express';
import { sql } from "../config/db.js";

const router = express.Router();

router.get("/summary/:userID", async (req, res) => {
    const { userID } = req.params;
    try {
        if (!userID) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const balanceResult = await sql`SELECT COALESCE(SUM(amount),0) AS balance FROM transactions WHERE user_id = ${userID}`;
        const incomeResult = await sql`SELECT COALESCE(SUM(amount),0) AS income FROM transactions WHERE user_id = ${userID} AND type = 'income'`;
        const expenseResult = await sql`SELECT COALESCE(SUM(amount),0) AS expense FROM transactions WHERE user_id = ${userID} AND type = 'expense'`;
        res.status(200).json({ balance: balanceResult[0].balance, income: incomeResult[0].income, expense: expenseResult[0].expense });
    } catch (error) {
        console.error('Error fetching transaction summary:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get("/:userId/:id", async (req, res) => {
    const { userId, id } = req.params;
    try {
        if (!userId || !id) {
            return res.status(400).json({ error: 'User ID and Transaction ID are required' });
        }
        const transaction = await sql`SELECT * FROM transactions WHERE user_id = ${userId} AND id = ${id}`;
        if (transaction.length === 0) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.status(200).json(transaction[0]);
    } catch (error) {
        console.error('Error fetching transaction:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const transactions = await sql`SELECT * FROM transactions WHERE user_id = ${userId}`;
        res.status(200).json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.post("/", async (req, res) => {
    const { user_id, title, description, type, amount, category } = req.body;
    try {
        if (!user_id || !title || !description || !type || !amount || !category) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        await sql`INSERT INTO transactions (user_id, title, description, type, amount, category)
            VALUES (${user_id}, ${title}, ${description}, ${type}, ${amount}, ${category})`
        res.status(201).json({ message: 'Transaction created successfully' });
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete("/:userID/:id", async (req, res) => {
    const { userID, id } = req.params;
    try {
        if (!userID || !id) {
            return res.status(400).json({ error: 'User ID and Transaction ID are required' });
        }
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Transaction ID must be a number' });
        }
        const result = await sql`DELETE FROM transactions WHERE user_id = ${userID} AND id = ${id}`;
        if (result.count === 0) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting transaction:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


export default router;