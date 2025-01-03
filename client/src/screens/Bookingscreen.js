import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";  // Import useParams

function Bookingscreen() {
    const { roomid } = useParams();  // Use useParams to get roomid directly from the URL
    
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState(false);
    const [room, setroom] = useState(null);

    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                setloading(true);
                const response = await axios.post('http://localhost:5000/api/rooms/getroombyid', { roomid });
    
                // Log the response to ensure the room data is being returned
                console.log(response.data);
    
                setroom(response.data);  // Update state with room data from API
                setloading(false);
            } catch (error) {
                setloading(false);
                seterror(true);
                console.error('Error fetching room:', error);
            }
        };
    
        fetchRoomData();
    }, [roomid]);  // The effect will run whenever the roomid changes
    
    return (
        <div className='m-5'>
            {loading ? (
                <h1>Loading...</h1>
            ) : error ? (
                <h1>Error...</h1>
            ) : (
                <div>
                    <div className="row justify-content-center mt-5 bs">
                        <div className="col-md-5">
                            <h1>{room.name}</h1>
                            {room.imageurls?.[0] && <img src={room.imageurls[0]} className="bigimg" />}
                        </div>

                        <div className="col-md-5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginTop: '50px' }}>
                            <div style={{ textAlign: 'right' }}>
                                <h1>Booking Details</h1>
                                <hr />
                                <b>
                                    <p>Name :</p>
                                    <p>From Date :</p>
                                    <p>To Date :</p>
                                    <p>Max Count : {room.maxCount}</p>
                                </b>
                            </div>

                            <div style={{ textAlign: 'right', marginTop: '20px' }}>
                                <b>
                                    <h1>Amount</h1>
                                    <hr />
                                    <p>Total Days:</p>
                                    <p>Rent Per Day : {room.rentperday}</p>
                                    <p>Total Amount</p>
                                </b>
                            </div>

                            <div style={{ float: 'right', marginTop: '20px' }}>
                                <button className='btn btn-primary'>Pay Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Bookingscreen;
