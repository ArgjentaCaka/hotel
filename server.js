const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express app
const app = express();
const port = 5000; // Set this to 5000 for consistency with your React app

// Middleware to handle CORS
app.use(cors());

// Body parsing middleware for POST requests
app.use(express.json());

// MongoDB connection URI (update this with your actual MongoDB URI)
const mongoURI = 'mongodb+srv://elzakrasniqi2:Mongo123.@cluster0.mwxtd.mongodb.net/mern-rooms'; // This is for local MongoDB, modify for remote if needed

// Connect to MongoDB using Mongoose
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Error connecting to MongoDB:', err));

// Define a Schema and Model for the rooms
const roomSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number
});

const Room = mongoose.model('Room', roomSchema);

// Serve the rooms data via an API endpoint
app.get('/api/rooms/getallrooms', async (req, res) => {
    try {
        // Retrieve all rooms from MongoDB
        const rooms = await Room.find();  // Mongoose will automatically query the database
        res.json(rooms);  // Send the rooms as a JSON response
    } catch (err) {
        console.error('Error fetching rooms from MongoDB:', err);
        res.status(500).json({ error: 'Error fetching rooms from MongoDB' });
    }
});
app.post('/api/rooms/getroombyid', async (req, res) => {
    const roomid = req.body.roomid;  // Extract the roomid from the request body
    try {
        const room = await Room.findOne({ _id: roomid }); // Find room by ID
        if (room) {
            res.json(room);  // If found, send the room data back
        } else {
            res.status(404).json({ message: "Room not found" });  // If room not found, send error
        }
    } catch (err) {
        console.error('Error fetching room by ID:', err);
        res.status(500).json({ error: 'Error fetching room by ID from MongoDB' });  // Send error on failure
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
