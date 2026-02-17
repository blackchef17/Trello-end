import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();

import morgan from 'morgan';
import './src/db/config.js';

import userRoutes from "./src/routes/user-routes.js";


const PORT = process.env.PORT || 3000;


//Middleware
app.use(express.json());

//Morgan Logging Middleware
app.use(morgan('dev'))

// Register user routes
// app.use("/api/users", userRoutes);
app.use("/api", userRoutes);

//Normal routes
app.get('/', (req, res) => {
  res.send('Everything is okay');
});

//Route that makes an error
app.get('/error', (req, res, next) => {
    const error = new Error("something is broken in your code");
    next(error); // sends the error to the handler
});

// (centralized error handler)
// MUST be at the bottom
app.use((err, req, res, next) => {
    res.status(500).send(err.message)
})


//Starting the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});