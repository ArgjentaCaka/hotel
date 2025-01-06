const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const roomsRoute = require('./routes/roomsRoute');
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
app.use('/api/rooms', roomsRoute); // Use the routes for
app.get('/api/rooms/getallrooms', async (req, res) => {
    try {
      const rooms = await Room.find(); // Marrim të gjitha dhomat nga baza e të dhënave
      res.json(rooms); // Dërgojmë dhomat tek klienti
    } catch (err) {
      console.error('Error fetching rooms:', err);
      res.status(500).json({ message: 'Error fetching rooms' });
    }
  });
  
  // `POST` route for creating a new room
  app.post('/api/rooms/getroombyid', async (req, res) => {
    const { name, description, price, imageUrl } = req.body;
  
    try {
      const newRoom = new Room({
        name,
        description,
        price,
        imageUrl,
      });
  
      await newRoom.save(); // Ruajmë dhomën në bazën e të dhënave
      res.status(201).json({ message: 'Room created successfully', room: newRoom });
    } catch (err) {
      console.error('Error creating room:', err);
      res.status(500).json({ message: 'Error creating room' });
    }
  });
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });