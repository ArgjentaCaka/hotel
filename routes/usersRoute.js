const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user'); // Import the User model
const router = express.Router();

// Rruga për regjistrimin e përdoruesit
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        // Kthe vetëm emrin dhe email-in e përdoruesit
        res.status(201).json({
            message: 'User registered successfully',
            user: { name: newUser.name, email: newUser.email },
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// Rruga për login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Kthe të dhënat e përdoruesit pas login-it
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// Rruga për të marrë të gjithë përdoruesit
router.get('/getallusers', async (req, res) => {
    try {
        const users = await User.find(); // Përdorim `User.find()` për të marrë të gjithë përdoruesit
        res.json(users); // Dërgojme të gjithë përdoruesit si JSON
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

module.exports = router;
