import express from 'express';
import authController from '../../../controllers/authController.js';

const authRouter = express.Router();

/**
 * @desc 
 * @route /api/auth/register
 * @method Post
 * @access public
 */
authRouter.post('/register', authController.register);

/**
 * @route   POST api/auth/login
 * @desc    User Login
 * @access  Public
 */
authRouter.post('/login', authController.login);

export default authRouter;
