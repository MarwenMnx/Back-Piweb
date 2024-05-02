import User from '../server/models/User.js';

const userController = {
  getAllUsers: (req, res) => {
    User.find()
      .sort({ date: -1 })
      .then(users => res.json(users))
      .catch(err =>
        res.json({
          success: false,
          message: `${err}`,
        })
      );
  },

  getUserById: (req, res) => {
    User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(err =>
        res.json({
          success: false,
          message: `${err}`,
        })
      );
  },

  updateUser: (req, res) => {
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
  },

  deleteUser: (req, res) => {
    User.findById(req.params.id)
      .then(user =>
        user.deleteOne().then(() =>
          res.json({
            success: true,
            message: `${user.username} has been successfully deleted`,
          })
        )
      )
      .catch(err =>
        res.status(404).json({
          success: false,
          message: `${err}`,
        })
      );
  },
};

export default userController;
