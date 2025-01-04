import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Oval from 'react-loader-spinner';  // Importoni Oval si default nga react-loader-spinner
import Loader from "../components/Loader";
import Error from "../components/Error";





function Bookingscreen() {
    const { roomid } = useParams(); // Përdorimi i useParams për të marrë roomid nga URL

    const [loading, setLoading] = useState(true);  // Variablat për ngarkim dhe gabime
    const [error, setError] = useState(false);
    const [room, setRoom] = useState(null);

    // Funksioni për të marrë të dhënat për dhomën
    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                setLoading(true); // Vendosni ngarkimin në true
                const response = await axios.post('http://localhost:5000/api/rooms/getroombyid', { roomid });

                // Logimi i të dhënave të dhomës
                console.log(response.data);

                setRoom(response.data); // Vendosni të dhënat e dhomës
                setLoading(false); // Përdorni setLoading për ta bërë false kur ngarkimi është përfunduar
            } catch (error) {
                setLoading(false); // Në rast gabimi, e vendosim ngarkimin në false
                setError(true); // Vendosni gabimin në true
                console.error('Error fetching room:', error);
            }
        };

        fetchRoomData();  // Thirrja e funksionit
    }, [roomid]);  // Efekti do të rifillojë kur `roomid` të ndryshojë

    return (
        <div className='m-5'>
            {loading ? (<Loader />


            ) : room ?  (
                <div>
                    <div className="row justify-content-center mt-5 bs">
                        <div className="col-md-5">
                            <h1>{room.name}</h1>
                            {room.imageurls?.[0] && <img src={room.imageurls[0]} alt={room.name} className="bigimg" />} {/* Siguroni që të shtoni atributin alt */}
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
                </div> ):(<Error/>)
            }
        </div>
    );
}

export default Bookingscreen;

