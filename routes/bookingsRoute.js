const express = require('express');
const router = express.Router();
const Booking = require("../models/booking");
const room  = require("../models/room");
const moment = require('moment');

router.post("/bookroom",async (req, res) => {
    const {
        room ,
            userid,
            fromdate ,
            todate ,
            totalAmount ,
            totaldays} = req.body

            try{
                const newbooking = new Booking({
                    room : room.name,
                    roomid : room._id,
                    userid ,
                    fromdate :moment(fromdate).format('DD-MM-YYYY'),
                    todate:moment (todate).format('DD-MM-YYYY'),
                    totalAmount,
                    totaldays,
                    transactionId : '1234'
                })

                const booking = await newbooking.save()

                const roomtemp = await Room.findOne({_id: room._id}) 

                roomtemp.currentbookings.push ({bookingid : booking._id , 
                    fromdate : moment(fromdate).format('DD-MM-YYYY'), 
                    todate :moment(todate).format('DD-MM-YYYY'),
                    userid : userid,
                    status : booking.status
                });

                await roomtemp.save();
                res.send ('Room Booked Successfully ')

            }catch(error){
                return res.status (400).json ({error});
            }
});

module.exports = router