import express from 'express';
import asyncHandler from 'express-async-handler';
import { register, login } from '../../../controllers/authControllers.js';
import { validateRegisterUser } from '../../middleware/validator.js';

const authRouter = express.Router();

// Register
authRouter.post('/register', asyncHandler(async (req, res) => {
    const { error } = validateRegisterUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    await register(req, res);
}));

// Login
authRouter.post('/login', asyncHandler(async (req, res) => {
    await login(req, res);
}));

export default authRouter;