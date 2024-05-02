import express from 'express';

import User from '../../../models/userModel.js';


const userRouter = express.Router();
/**
 * @route   GET api/users
 * @desc    Get all Users
 * @access  Public
 */
userRouter.get('/', (req, res) => {
  User.find()
    .sort({ date: -1 })
    .then(users => res.json(users))
    .catch(err =>
      res.json({
        success: false,
        message: `${err}`,
      })
    );
});

/**
 * @route   GET api/users/:id
 * @desc    Get a User
 * @access  Public
 */
userRouter.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err =>
      res.json({
        success: false,
        message: `${err}`,
      })
    );
});
userRouter.put('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.set({ username: req.body.username, role: req.body.role }); // Update both username and role
      user.save().then(() =>
        res.json({
          success: true,
          message: `${user.username} has been successfully updated`,
        })
      );
    })
    .catch(err =>
      res.status(404).json({
        success: false,
        message: `${err}`,
      })
    );
});


/**
 * @route   DELETE api/users/:id
 * @desc    Delete a User
 * @access  Public
 */
userRouter.delete('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user =>
      user.deleteOne().then(() =>
        res.json({
          success: true,
          message: `${user.username} has been successful deleted`,
        })
      )
    )
    .catch(err =>
      res.status(404).json({
        success: false,
        message: `${err}`,
      })
    );
});




export default userRouter;