const express = require("express");
const router = express.Router();

const Rooms = require('../models/room')

// Backend (Node.js/Express)
router.get("/getallrooms", async (req, res) => {
    try {
      const rooms = await Rooms.find({});
      if (rooms.length > 0) {
        return res.json({ rooms });  // Dërgo një objekt që përmban fushën rooms
      } else {
        return res.json({ rooms: [] });  // Dërgo një varg bosh nëse nuk ka dhoma
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: error.message });
    }
  });
  
  
  

router.post('/getroombyid', async (req, res) => {
    const { roomid } = req.body; // Përdorim roomid nga trupi i kërkesës (body)
    try {
        const room = await Rooms.findOne({ _id: roomid });
        if (room) {
            res.send(room);
        } else {
            res.status(404).json({ message: "Room not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// router.get("/getallrooms" , async (req, res )=>{
//     try {
//         const rooms = await Rooms.find()
//         res.send(rooms)
//     } catch (error) {
//         return res.status(400).json({error});
//     }
// })


router.post("/addroom", async (req, res) => {
    console.log("Data received:", req.body);  // Kjo do t'ju ndihmojë të shihni se çfarë po merr backend
  
    try {
      const newroom = new Rooms(req.body);
      await newroom.save();
      res.send('New Room Added Successfully');
    } catch (error) {
      console.error("Error saving room:", error);  // Ky log do të tregojë ndihmë më të detajuar për gabimin
      return res.status(400).json({ error: error.message });  // Dërgoni mesazhin e gabimit
    }
  });
  
  


module.exports = router; 