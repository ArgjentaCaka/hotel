const express = require('express');
const router = express.Router();
const Booking = require("../models/booking");
const Room = require("../models/room");  // Sigurohuni që Room është i saktë
const moment = require('moment');

router.post("/bookroom", async (req, res) => {
    const {
        roomid,
        userid,
        fromdate,
        todate,
        totalAmount,
        totaldays
    } = req.body;

    try {
        // Kërkoni dhomën përkatëse në bazën e të dhënave
        const room = await Room.findById(roomid);  // Këtu është kërkesa për dhomën duke përdorur roomid

        if (!room) {
            return res.status(404).json({ error: "Room not found" });
        }

        // Krijoni një rezervim të ri
        const newBooking = new Booking({
            room: room.name,
            roomid: room._id,
            userid,
            fromdate: moment(fromdate).format('DD-MM-YYYY'),
            todate: moment(todate).format('DD-MM-YYYY'),
            totalAmount,
            totaldays,
            transactionId: '1234',  // Ose mund të krijoni një transaction ID të rastësishëm (nuk përdorim Stripe tani)
        });

        const booking = await newBooking.save();

        // Përdorni roomid për të gjetur dhomën dhe shtoni rezervimin e ri
        const roomTemp = await Room.findById(room._id);

        // Kontrolloni nëse dhoma është marrë me sukses
        if (!roomTemp) {
            return res.status(404).json({ error: "Room not found in roomTemp" });
        }

        // Shtoni rezervimin e ri në current bookings
        roomTemp.currentbookings.push({
            bookingid: booking._id,
            fromdate: moment(fromdate).format('DD-MM-YYYY'),
            todate: moment(todate).format('DD-MM-YYYY'),
            userid: userid,
            status: booking.status
        });

        await roomTemp.save();  // Ruani ndryshimet në dhomë

        // Kthe përgjigje pozitive
        res.send('Your room has been successfully booked!');
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

router.post("/getbookingsbyuserid", async (req, res) => {
    const userid = req.body.userid;

    try {
        const bookings = await Booking.find({ userid: userid });
        res.send(bookings);
    } catch (error) {
        return res.status(400).json({ error });
    }
});

module.exports = router;
