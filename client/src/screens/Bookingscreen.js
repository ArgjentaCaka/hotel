import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Bookingscreen({ match }) {
    
    const [loading, setloading] = useState();
    const [error, seterror] = useState();
    const [room, setroom] = useState();
    useEffect(async () => {
        try {
            console.log("Room ID:", match.params.roomid);
            setloading(true)
            const response = await axios.post('http://localhost:5000/api/rooms/getroombyid' , {roomid : match.params.roomid});

            setroom(response.data); // Update state with room data from API
            setloading(false);

        } catch (error) {
            setloading(false);
            seterror(true);
        }
    }, []);

    return (
        <div>
            
            {loading ? (<h1>Loading...</h1>) : error ? (<h1>Error...</h1>) :(<div>
              
            <div className="row " > 
                <div className="col-md-5">
                    <h1>{room.name}</h1>
                    <img src = {room.imageurls[0]} className='bigimg'/>
                </div>
                <div className="col-md-5"></div>
                </div> </div>)}
            
        </div>
    );


}
export default Bookingscreen;


  