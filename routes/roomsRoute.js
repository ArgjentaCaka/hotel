const express = require("express");
const router = express.Router();

const Room = require('../models/room')

router.get("/getallrooms", async(req, res) => {
    try{
        const room = await Room.find({})
        res.send(rooms)
    }catch(error){
        return res.status(404).json({ message: error });
    }
});

module.exports = router; 