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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [searchKey, setSearchKey] = useState('');
  const [type, setType] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/rooms/getallrooms');
        setRooms(response.data || []);
        setLoading(false);
      } catch (error) {
        setError('Error fetching rooms');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterByDate = (dates) => {
    if (!dates || dates.length < 2) return;

    const startDate = moment(dates[0]);
    const endDate = moment(dates[1]);
    setFromDate(startDate.format('DD-MM-YYYY'));
    setToDate(endDate.format('DD-MM-YYYY'));

    const filteredRooms = rooms.filter((room) => {
      if (!room.currentbookings || !Array.isArray(room.currentbookings)) {
        return true;
      }

      return room.currentbookings.every((booking) => {
        const bookingStart = moment(booking.fromdate, 'DD-MM-YYYY');
        const bookingEnd = moment(booking.todate, 'DD-MM-YYYY');
        return endDate.isBefore(bookingStart) || startDate.isAfter(bookingEnd);
      });
    });

    setRooms(filteredRooms);
  };

  const filterByType = (selectedType) => {
    setType(selectedType);
    if (selectedType === 'all') {
      setRooms(rooms);
    } else {
      setRooms(rooms.filter((room) => room.type.toLowerCase() === selectedType.toLowerCase()));
    }
  };

  const filterBySearch = () => {
    setRooms(
      rooms.filter((room) => room.name.toLowerCase().includes(searchKey.toLowerCase()))
    );
  };

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
            placeholder='Search rooms'
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            onKeyUp={filterBySearch}
          />
        </div>
        <div className='col-md-3'>
          <select
            className='form-control'
            value={type}
            onChange={(e) => filterByType(e.target.value)}
          >
            <option value='all'>All</option>
            <option value='luxury'>Luxury</option>
            <option value='standard'>Standard</option>
            <option value='suite'>Suite</option>
            <option value='executive'>Executive</option>
            <option value='grand'>Grand</option>
          </select>
        </div>
      </div>
      <div className='row justify-content-center mt-5'>
        {loading ? (
          <Loader />
        ) : error ? (
          <p className='text-danger'>{error}</p>
        ) : (
          rooms.map((room) => (
            <div className='col-md-9 mt-2' key={room._id}>
              <Room room={room} fromdate={fromDate} todate={toDate} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Homescreen;
