import express from 'express';
import dotenv from 'dotenv';
import transactionsRoute from './routes/transactionsRoute.js';
import ratelimiter from './middleware/rateLimiter.js';
import { initDB } from "./config/db.js";
import job from './config/cron.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

job.start();

app.use(express.json());
app.use(ratelimiter);
app.use('/api/transactions', transactionsRoute);

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

initDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
