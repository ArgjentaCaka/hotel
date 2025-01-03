const express = require("express");
const router = express.Router();

const Rooms = require('../models/room')

router.get("/getallrooms", async(req, res) => {
    try{
        const rooms = await Rooms.find({})
       return res.json({rooms});
    }catch(error){
        return res.status(400).json({ message: error });
    }
});

router.post('/api/rooms/getroombyid', async (req, res) => {
    const roomid = req.body.roomid;  // Ensure roomid is sent in the request body
    try {
        const room = await Rooms.findOne({ _id: roomid });
        if (room) {
            res.send(room);  // Send room data back if found
        } else {
            res.status(404).json({ message: "Room not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



module.exports = router; 