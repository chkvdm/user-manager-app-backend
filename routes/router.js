import express from 'express';
import authRouter from './auth/authrouter.js';
import usersRouter from './users/usersrouter.js';

const router = express.Router();

router.use('/api/auth', authRouter);
router.use('/api/users', usersRouter);

export default router;
