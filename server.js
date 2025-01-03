
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

// Initialize Express app
const app = express();
const port = 5000; // Set this to 5000 for consistency with your React app


// Middleware to handle CORS
app.use(cors());

// Body parsing middleware for POST requests
app.use(express.json());

// Path to rooms JSON file
const roomsFilePath = path.join(__dirname, 'rooms.json');

// Helper function to read rooms data from the JSON file
function readRoomsFromFile() {
    try {
        const data = fs.readFileSync(roomsFilePath, 'utf8');
        return JSON.parse(data);  // Convert the JSON string into an array of rooms
    } catch (err) {
        console.error('Error reading rooms file:', err);
        return [];
    }
}

// Serve the rooms data via an API endpoint
app.get('/api/rooms/getallrooms', (req, res) => {
    const rooms = readRoomsFromFile();  // Read rooms from rooms.json file
    res.json(rooms);  // Send the rooms as a JSON response
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
