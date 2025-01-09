import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from 'moment';

function Bookingscreen() {
    const { roomid, fromdate: paramFromDate, todate: paramToDate } = useParams(); // Destructure from useParams

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [room, setRoom] = useState(null);
    const [totaldays, setTotalDays] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0); // Initializing totalAmount

    // Ensure that fromdate and todate are valid moment objects
    const fromdate = moment(paramFromDate, 'DD-MM-YYYY');
    const todate = moment(paramToDate, 'DD-MM-YYYY');

    // Recalculate totaldays whenever fromdate or todate changes
    useEffect(() => {
        if (fromdate.isValid() && todate.isValid()) {
            const days = moment.duration(todate.diff(fromdate)).asDays() + 1; // Add 1 to include both start and end days
            setTotalDays(days);
        } else {
            console.error('Invalid date format:', paramFromDate, paramToDate);
        }
    }, [fromdate, todate]); // Dependencies ensure it runs only when dates change

    // Fetch room data
    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                setLoading(true);
                const response = await axios.post('http://localhost:5000/api/rooms/getroombyid', {
                    roomid: roomid
                });

                setRoom(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(true);
                console.error('Error fetching room:', error);
            }
        };

        fetchRoomData();
    }, [roomid]);

    // Recalculate totalAmount once room and totaldays are available
    useEffect(() => {
        if (room && totaldays > 0) {
            const amount = room.rentperday * totaldays;
            setTotalAmount(amount);
        }
    }, [room, totaldays]); // Runs whenever room or totaldays changes

    async function bookRoom(){
        const bookingDetails = {
            room ,
            userid : JSON.parse(localStorage.getItem('currentUser'))._id,
            fromdate ,
            todate ,
            totalAmount ,
            totaldays
        }
        try{
            const result = await axios.post('http://localhost:5000/api/bookings/bookroom',bookingDetails)
        }catch(error){

        }
    }

    return (
        <div className='m-5'>
            {loading ? (
                <Loader />
            ) : room ? (
                <div>
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
                                    <p>Name : {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                                    <p>From Date : {fromdate.format('DD-MM-YYYY')}</p>
                                    <p>To Date : {todate.format('DD-MM-YYYY')}</p>
                                    <p>Max Count : {room.maxCount}</p>
                                </b>
                            </div>

                            <div style={{ textAlign: 'right', marginTop: '20px' }}>
                                <b>
                                    <h1>Amount</h1>
                                    <hr />
                                    <p>Total Days: {totaldays}</p>
                                    <p>Rent Per Day : {room.rentperday}</p>
                                    <p>Total Amount: {totalAmount}</p> {/* Using the calculated totalAmount */}
                                </b>
                            </div>

                            <div style={{ float: 'right', marginTop: '20px' }}>
                                <button className='btn btn-primary' >Pay Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Error />
            )}
        </div>
    );
}

export default Bookingscreen;

