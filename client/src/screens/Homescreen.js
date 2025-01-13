import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Room from '../components/Room';
import Loader from '../components/Loader';
import 'antd/dist/reset.css';
import Error from '../components/Error';
import moment from 'moment'
import { DatePicker, Space } from 'antd';
import { set } from 'mongoose';

const { RangePicker } = DatePicker;

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setloading] = useState();
  const [error, seterror] = useState()

  const [fromdate, setfromdate] = useState()
  const [todate, settodate] = useState()
  const [duplicaterooms, setduplicaterooms] = useState([])

  const [searchkey , setsearchkey] = useState('')
  const [type , settype] = useState('all')

  useEffect(() => {
    async function fetchData() {
      try {
        setloading(true);
        const response = await axios.get('http://localhost:5000/api/rooms/getallrooms');
        setRooms(response.data.rooms); // Update state with room data from API
        setduplicaterooms(response.data.rooms)
        setloading(false);  // Set loading to false after successful response
      } catch (error) {
        setloading(false);  // Set loading to false after error as well
        seterror('Error fetching rooms'); // You can also add an error message
        console.error('Error fetching rooms:', error);
      }
    }

    fetchData();
  }, []); // Empty array means this will run once when the component mounts
  function filterByDate(dates) {
    console.log((dates[0]).format('DD-MM-YYYY'))
    console.log((dates[1]).format('DD-MM-YYYY'))
    setfromdate((dates[0]).format('DD-MM-YYYY'));
    settodate((dates[1]).format('DD-MM-YYYY'));

    var temprooms = [];
    var availability = false;
    for (const room of duplicaterooms) {
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          if (!moment(
            moment(moment(dates[0]).format('DD-MM-YYYY')).isBetween(
              booking.fromdate, booking.todate
            )
          )
         && !moment(
          moment(moment(dates[1]).format('DD-MM-YYYY')).isBetween(
            booking.fromdate, booking.todate
          )
        )
          ) {
            if (
              moment(dates[0]).format('DD-MM-YYYY') !== booking.fromdate &&
                moment(dates[0]).format('DD-MM-YYYY') !== booking.todate &&
                  moment(dates[1]).format('DD-MM-YYYY') !== booking.fromdate &&
                    moment(dates[1]).format('DD-MM-YYYY') !== booking.todate 
            )
            {
                      availability = true;
                    }
          }
        }
      }

      if(availability == true || room.currentbookings.length== 0)
      {
        temprooms.push(room)
      }
      
    }

  }
  function filterBySearch(){
    const temprooms = duplicaterooms.filter(room => room.name.toLowerCase().includes(searchkey.toLowerCase()))

    setRooms(temprooms)
  }
  function filterByType(e){
    settype(e)
    if(e!== 'all'){
      const temprooms = duplicaterooms.filter(room => room.type.toLowerCase()==e.toLowerCase())

    setRooms(temprooms)

    }else{
      setRooms(duplicaterooms)
    }
  }
  return (
    <div className='container' >
      <div className='row mt-5' >
        <div className='col-md-3'>  <RangePicker format='DD-MM-YYYY ' onChange={filterByDate} />
        </div>
        <div className='col-md-5'>
          <input type='text' className='form-control' placeholder='search rooms'
          value = {searchkey} onChange={(e)=>{setsearchkey(e.target.value)}} onKeyUp={filterBySearch} />
        </div>
        <div className='col-md-3'>
        <select className='form-control ' value ={type} onChange={(e)=>{filterByType(e.target.value)}}>
          <option value = "all">All</option>
          <option value = "luxury">Luxury</option>
          <option value = "standard">Standard</option>
          <option value = "suite">Suite</option>
          <option value = "executive">Executive</option>
          <option value = "grand">Grand</option>

        </select>
        </div>

      </div>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : (

          rooms.map((room) => {
            return <div className="col-md-9 mt-2 " key={room._id}>
              <Room room={room} fromdate={fromdate} todate={todate} />
            </div>;
          })) }
      </div>


    </div>
  );
}

export default Homescreen;
