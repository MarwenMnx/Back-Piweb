import express from 'express';
import userController from '../../../controllers/userController.js';

const userRouter = express.Router();

/**
 * @route   GET api/users
 * @desc    Get all Users
 * @access  Public
 */
userRouter.get('/', userController.getAllUsers);

/**
 * @route   GET api/users/:id
 * @desc    Get a User
 * @access  Public
 */
userRouter.get('/:id', userController.getUserById);

/**
 * @route   PUT api/users/:id
 * @desc    Update a User
 * @access  Public
 */
userRouter.put('/:id', userController.updateUser);

/**
 * @route   DELETE api/users/:id
 * @desc    Delete a User
 * @access  Public
 */
userRouter.delete('/:id', userController.deleteUser);

export default userRouter;
