import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log('User already exists:', existingUser); // Log existing user
            return res.status(400).json({ message: "This user is already registered" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        console.log('Creating user:', username); // Log username being created
        const user = await User.create({
            username,
            password: hashedPassword,
            role
        });

        // Generate token
        const token = user.generateToken();

        res.json({
            message: "User registered",
            user: {
                username: user.username,
                role: user.role
            },
            token
        });
    } catch (error) {
        console.error('Error during registration:', error); // Log registration error
        res.status(500).json({ message: "Server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user
        const user = await User.findOne({ username });
        if (!user) {
            console.log('User not found:', username); // Log username not found
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // Check password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            console.log('Invalid password for user:', username); // Log invalid password
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // Generate token
        const token = user.generateToken();

        res.status(200).json({
            message: "Login successful",
            user: {
                username: user.username,
                role: user.role
            },
            token
        });
    } catch (error) {
        console.error('Error during login:', error); // Log login error
        res.status(500).json({ message: "Server error" });
    }
};
