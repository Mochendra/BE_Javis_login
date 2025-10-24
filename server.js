import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import { authMiddleware } from './middleware/authMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// GUNAKAN DOMAIN FRONTEND PRODUKSI
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://fe-javis-y8gv.vercel.app';

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true, // WAJIB
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/api/auth', authRoutes);

app.get('/api/dashboard', authMiddleware, (req, res) => {
  res.json({ message: `Selamat datang di dashboard, ${req.user?.name || 'Pengguna'}` });
});

app.get('/', (req, res) => res.send('Backend Express berjalan'));

app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
