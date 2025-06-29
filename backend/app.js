import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import passport from 'passport';
import session from 'express-session';
//import authRoutes from './routes/auth.js';
import dashboardRoutes from './routes/dashboard.js';
import uploadRoutes from './routes/upload.js';
import connectDB from './config/db.js';
import mongoose from 'mongoose'; 

dotenv.config();
const app = express();

connectDB(); // Removed 'await' since top-level await is not supported in CommonJS/most Node.js setups

// Middleware setup
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(session({ secret: 'your_secret', resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// Routes setup
//app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/upload', uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));