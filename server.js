const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/usersRoute'); // Import your routes

// Initialize Express app
const app = express();
const port = 5000; 

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// MongoDB URI
const mongoURI = 'mongodb+srv://elzakrasniqi2:Mongo123.@cluster0.mwxtd.mongodb.net/mern-rooms'; 

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Error connecting to MongoDB:', err));

// API routes
app.use('/api/users', userRoutes);  // Use the routes for user

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
