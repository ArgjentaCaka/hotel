const express = require('express');
const router = express.Router();
const Booking = require("../models/booking");
const Room = require("../models/room");  // Sigurohuni që Room është i saktë
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')('sk_test_51Qg2oOH4OZikeoOiVfOoIxnCugb75gOxIQuKOC84xvMJXyXvHSxGza1TCmFPeecGOvj1WfcKr5DDh4oIUnxXqNi700EF010xGh');

router.post("/bookroom", async (req, res) => {
    const {
        roomid,
        userid,
        fromdate,
        todate,
        totalAmount,
        totaldays,
        token
    } = req.body;

    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })
        const payment = await stripe.charges.create({
            amount: totalAmount * 100,
            customer: customer.id,
            currency: 'inr',
            receipt_email: token.email

        }, {
            idempotencyKey: uuidv4()
        }
        )

        if (payment) {

            
                // Merrni informacionin për dhomën nga baza e të dhënave
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
                    transactionId: '1234',  // Ose mund të krijoni një transaction ID të rastësishëm
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
                

            

        }
        res.send('Payment Successfully, Your Room is Booked')
    }

    catch (error) {
        return res.status(400).json({ error });

    }


});

module.exports = router;
