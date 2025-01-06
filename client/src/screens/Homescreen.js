import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setloading] = useState();
  const [error, seterror] = useState()

  useEffect(() => {
    async function fetchData() {
      try {
        setloading(true);
        const response = await axios.get('http://localhost:5000/api/rooms/getallrooms');
        setRooms(response.data.rooms); // Update state with room data from API
        setloading(false);  // Set loading to false after successful response
      } catch (error) {
        setloading(false);  // Set loading to false after error as well
        seterror('Error fetching rooms'); // You can also add an error message
        console.error('Error fetching rooms:', error);
      }
    }

    fetchData();
  }, []); // Empty array means this will run once when the component mounts

  return (
    <div className='container' >
      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader/>
        ) : rooms.length >1 ? (

          rooms.map((room )=> {
            return <div className="col-md-9 mt-2 " key={room._id}>
              <Room room={room}/>
               </div>;
})) : ( 
  <Error/>
       
        
        )}
      </div>


    </div>
  );
}

export default Homescreen;
