const express = require("express");
const router = express.Router();

const Rooms = require('../models/room'); // Sigurohu që rruga është e saktë

// Rruga për marrjen e të gjitha dhomave
router.get("/getallrooms", async (req, res) => {
    try {
        const rooms = await Rooms.find(); // Përdor `Rooms.find()` për të marrë të dhënat
        res.json(rooms); // Kthe një listë të thjeshtë
    } catch (error) {
        console.error('Gabim gjatë marrjes së dhomave:', error);
        res.status(400).json({ message: 'Gabim gjatë marrjes së dhomave', error });
    }
});

// Rruga për marrjen e një dhome specifike sipas ID
router.post('/getroombyid', async (req, res) => {
    const { roomid } = req.body; 
    try {
        const room = await Rooms.findOne({ _id: roomid });
        if (room) {
            res.json(room);
        } else {
            res.status(404).json({ message: "Room not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
