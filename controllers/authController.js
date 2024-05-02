import User from '../server/models/User.js';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import { validateRegisterUser } from '../server/middleware/validator.js';

const authController = {
  register: asyncHandler(async (req, res) => {
    const { error } = validateRegisterUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(400).json({ message: "This user is already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = await User.create({
      username: req.body.username,
      password: hashedPassword,
      role: req.body.role
    });
    const token = user.generateToken();
    const { password, ...userWithoutPassword } = user._doc;
    res.json({
      message: "User registered",
      user: userWithoutPassword,
      token
    });
  }),

  login: asyncHandler(async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    const token = user.generateToken();
    const { password, ...others } = user._doc;
    res.status(200).json({ message: "Login successful", others, token });
  })
};

export default authController;
