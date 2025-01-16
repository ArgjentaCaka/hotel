import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from 'moment';

function Bookingscreen() {
    const { roomid, fromdate: paramFromDate, todate: paramToDate } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [room, setRoom] = useState(null);
    const [totaldays, setTotalDays] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0); // Initializing totalAmount
    
    const fromdate = moment(paramFromDate, 'DD-MM-YYYY');
    const todate = moment(paramToDate, 'DD-MM-YYYY');

    useEffect(() => {

        if ( !localStorage.getItem('currentUser')){
            window.location.reload ='/login'
        }
        if (fromdate.isValid() && todate.isValid()) {
            const days = moment.duration(todate.diff(fromdate)).asDays() + 1;
            setTotalDays(days);
        }
    }, [fromdate, todate]);

    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                setLoading(true);
                const response = await axios.post('http://localhost:5000/api/rooms/getroombyid', { roomid });
                setRoom(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(true);
            }
        };
        fetchRoomData();
    }, [roomid]);

    useEffect(() => {
        if (room && totaldays > 0) {
            setTotalAmount(room.rentperday * totaldays);
        }
    }, [room, totaldays]);

    // Simulated booking submission function
    async function bookRoom ()  {
        const bookingDetails = {
            roomid,
            userid: JSON.parse(localStorage.getItem('currentUser'))._id,
            fromdate: fromdate.toISOString(),
            todate: todate.toISOString(),
            totalAmount,
            totaldays,
        };

        try {
            const result = await axios.post('http://localhost:5000/api/bookings/bookroom', bookingDetails);
            console.log('Booking result:', result.data);
            alert("Booking successful!");
        } catch (error) {
            console.error('Error booking room:', error.response ? error.response.data : error.message);
            alert("Error occurred while booking.");
        }
    };

    return (
        <div className="m-5">
            {loading ? <Loader /> : error ? <Error /> : room && (
                <div className="row justify-content-center mt-5 bs">
                    <div className="col-md-5">
                        <h1>{room.name}</h1>
                        {room.imageurls?.[0] && <img src={room.imageurls[0]} alt={room.name} className="bigimg" />}
                    </div>
                    <div className="col-md-5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginTop: '50px' }}>
                        <div style={{ textAlign: 'right' }}>
                            <h1>Booking Details</h1>
                            <hr />
                            <b>
                                <p>Name: {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                                <p>From Date: {fromdate.format('DD-MM-YYYY')}</p>
                                <p>To Date: {todate.format('DD-MM-YYYY')}</p>
                                <p>Max Count: {room.maxCount}</p>
                            </b>
                        </div>
                        <div style={{ textAlign: 'right', marginTop: '20px' }}>
                            <b>
                                <h1>Amount</h1>
                                <hr />
                                <p>Total Days: {totaldays}</p>
                                <p>Rent Per Day: {room.rentperday}</p>
                                <p>Total Amount: {totalAmount}</p>
                            </b>
                        </div>
                        <div style={{ float: 'right', marginTop: '20px' }}>
                            <button  className="btn btn-primary" onClick={bookRoom}>Pay now</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Bookingscreen;
