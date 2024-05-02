import express from 'express';
import asyncHandler from 'express-async-handler';
import authController from '../../../controllers/authController.js'; // Change the import path if necessary
import { validateRegisterUser } from '../../middleware/validator.js';

const authRouter = express.Router();

// Register
authRouter.post('/register', asyncHandler(async (req, res) => {
    const { error } = validateRegisterUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    await authController.register(req, res);
}));

// Login
authRouter.post('/login', asyncHandler(async (req, res) => {
    await authController.login(req, res);
}));

export default authRouter;


// const express = require("express");
// const { login, register } = require("../../../controllers/authControllers");
// const router = express.Router();

// router.post("/login", login);

// router.post("/register", register);

// module.exports = router;
