import express from 'express';
import cors from 'cors'
import employeeRoute from './routes/employee.js'
import connectDB from './utils/connectDB.js';
import mongoose from 'mongoose';

import dotenv from 'dotenv'
dotenv.config()

const port = process.env.SERVER_PORT
const app = express();

// Connecting mongoDB 
connectDB()

// Middlewares 
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route setting
app.use('/', employeeRoute )


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Internal Server Error"});
});


// Connecting server after mongoDB connection
mongoose.connection.once("open", () => {
    app.listen( port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
