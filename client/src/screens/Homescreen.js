import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Room from '../components/Room';
import Loader from '../components/Loader';
import 'antd/dist/reset.css';
import Error from '../components/Error';
import moment from 'moment'
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setloading] = useState();
  const [error, seterror] = useState()

  const[fromdate , setfromdate] =useState()
  const[todate , settodate] =useState()


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
  function filterByDate(dates){
     console.log( (dates[0]).format('DD-MM-YYYY'))
     console.log( (dates[1]).format('DD-MM-YYYY'))
     setfromdate( (dates[0]).format('DD-MM-YYYY'))
     settodate( (dates[1]).format('DD-MM-YYYY'))
     
  }
  return (
    <div className='container' >
    <div className='row mt-5' > 
      <div className='col-md-3'>  <RangePicker format='DD-MM-YYYY ' onChange={filterByDate}/>
      </div>
    </div>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader/>
        ) : rooms.length > 1 ? (

          rooms.map((room )=> {
            return <div className="col-md-9 mt-2 " key={room._id}>
              <Room room={room } fromdate={fromdate} todate={todate}/>
               </div>;
})) : ( 
  <Error/>
       
        
        )}
      </div>


    </div>
  );
}

export default Homescreen;
