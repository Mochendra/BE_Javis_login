import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import { authMiddleware } from './middleware/authMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Middleware
app.use(express.json());
app.use(cookieParser());


// Handle preflight request
app.use(cors({
  origin: FRONTEND_URL, // HARUS spesifik, bukan '*'
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

// Routes
app.use('/api/auth', authRoutes);

// Protected route example
app.get('/api/dashboard', authMiddleware, (req, res) => {
  res.json({ message: `Selamat datang di dashboard, ${req.user.name}` });
});

app.get('/', (req, res) => res.send('Backend Express berjalan'));

// Start server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
