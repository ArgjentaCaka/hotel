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
  
    try {
      // Gjeni përdoruesin nga email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Krahasoni password-in e dërguar me atë të ruajtur (hash)
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Krijo një objekt që do të dërgohet si përgjigje
      const userResponse = {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin, // Dërgo 'isAdmin' si pjesë e përgjigjes
      };
  
      // Kthejeni këtë objekt si përgjigje pas login-it
      res.json({ user: userResponse });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
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
