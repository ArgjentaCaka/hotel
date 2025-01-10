const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    maxCount: {
        type: Number,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true
    },
    rentperday: {
        type: Number,
        required: true
    },
    imageurls: [],
    currentbookings: [  // Emri është ndryshuar nga 'currentbooking' në 'currentbookings'
        {
            bookingid: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
            fromdate: { type: String },
            todate: { type: String },
            userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            status: { type: String }
        }
    ],

    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }

}, {
    timestamps: true,
});

const roomModel = mongoose.model('rooms', roomSchema);

module.exports = roomModel;
