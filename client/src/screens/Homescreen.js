import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Room from '../components/Room';
import Loader from '../components/Loader';
import 'antd/dist/reset.css';
import moment from 'moment';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [duplicateRooms, setDuplicateRooms] = useState([]);

  const [searchKey, setSearchKey] = useState('');
  const [type, setType] = useState('all');

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/rooms/getallrooms');
        setRooms(response.data.rooms);
        setDuplicateRooms(response.data.rooms);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError('Error fetching rooms');
        console.error('Error fetching rooms:', error);
      }
    }

    fetchData();
  }, []);

  // Filtrimi sipas datës
  function filterByDate(dates) {
    if (!dates || dates.length < 2) {
      console.error("Invalid date range:", dates);
      return;
    }
  
    const startDate = dates[0]; // Keep as Moment object
    const endDate = dates[1]; // Keep as Moment object
  
    setFromDate(startDate.format('DD-MM-YYYY'));
    setToDate(endDate.format('DD-MM-YYYY'));
  
    const filteredRooms = duplicateRooms.filter(room => {
      // Kontrolloni që `currentBookings` ekziston dhe është një array
      if (!room.currentbookings || !Array.isArray(room.currentbookings) || room.currentbookings.length === 0) {
        console.log("Room has no bookings:", room);
        return true; // Dhoma është e disponueshme nëse nuk ka rezervime
      }
    
      // Filtrimi i dhomave në bazë të datave të rezervimit
      const isRoomAvailable = room.currentbookings.every(booking => {
        const bookingStart = moment(booking.fromdate, 'DD-MM-YYYY');
        const bookingEnd = moment(booking.todate, 'DD-MM-YYYY');
    
        const isAvailable =
          endDate.isBefore(bookingStart) || startDate.isAfter(bookingEnd);
    
        console.log(
          `Room: ${room.name}, Available: ${isAvailable}`,
          `Booking Start: ${bookingStart.format('DD-MM-YYYY')}, Booking End: ${bookingEnd.format('DD-MM-YYYY')}`
        );
    
        return isAvailable; // Kjo do të kthejë `true` nëse dhoma është e disponueshme
      });
    
      return isRoomAvailable;
    });
    
  
    console.log("Filtered Rooms:", filteredRooms);
    setRooms(filteredRooms);
  }
  

  // Filtrimi sipas tipit të dhomës
  function filterByType(e) {
    setType(e);
    if (e !== 'all') {
      const tempRooms = duplicateRooms.filter(room => room.type.toLowerCase() === e.toLowerCase());
      setRooms(tempRooms);
    } else {
      setRooms(duplicateRooms);
    }
  }

  // Filtrimi sipas search key
  function filterBySearch() {
    const tempRooms = duplicateRooms.filter(room =>
      room.name.toLowerCase().includes(searchKey.toLowerCase())
    );
    setRooms(tempRooms);
  }

  return (
    <div className='container'>
      <div className='row mt-5'>
        <div className='col-md-3'>
          <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
        </div>
        <div className='col-md-5'>
          <input
            type='text'
            className='form-control'
            placeholder='search rooms'
            value={searchKey}
            onChange={(e) => { setSearchKey(e.target.value) }}
            onKeyUp={filterBySearch}  // Përdorimi i funksionit filterBySearch
          />
        </div>
        <div className='col-md-3'>
          <select className='form-control' value={type} onChange={(e) => { filterByType(e.target.value) }}>
            <option value="all">All</option>
            <option value="luxury">Luxury</option>
            <option value="standard">Standard</option>
            <option value="suite">Suite</option>
            <option value="executive">Executive</option>
            <option value="grand">Grand</option>
          </select>
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : (
          rooms.map((room) => {
            return <div className="col-md-9 mt-2" key={room._id}>
              <Room room={room} fromdate={fromDate} todate={toDate} />
            </div>;
          })
        )}
      </div>
    </div>
  );
}

export default Homescreen;
