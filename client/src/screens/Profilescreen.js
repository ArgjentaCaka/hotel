import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from "../components/Loader";
import Error from "../components/Error";

const { TabPane } = Tabs;

function Profilescreen() {

    const user = JSON.parse(localStorage.getItem('currentUser'))
    

    useEffect(() => {
        if (!user) {
            window.location.href = '/login';
        }
    }, [])
    return (
        <div className='ml-3 mt-3'>
            <Tabs defaultActiveKey='1'>
                <TabPane tab="Profile" key='1'>
                    <h1>My Profile</h1>

                    <br />
                    <h1>Name : {user.name}</h1>
                    <h1>Email : {user.email}</h1>
                    <h1>isAdmin : {user.isAdmin ? 'YES' : 'NO'}</h1>
                </TabPane>
                <TabPane tab="Bookings" key="2">
                    <MyBookings />
                </TabPane>

            </Tabs>
        </div>
    )
}
export default Profilescreen;

export function MyBookings() {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    const [bookings, setbookings] = useState([])
     const [loading, setLoading] = useState(false);
        const [error, setError] = useState();
    useEffect(async () => {
        try {
            setLoading(true);
            const data = await axios.post('/api/bookings/getbookingsbyuserid', { userid: user._id }).data
            console.log(data);
            setbookings(data)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
            setError(error)
        }
    }, []);
    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    {loading && (<Loader/>)}
                    {bookings && (bookings.map(booking => {
                        return <div className='bs'>
                            <h1>{booking.room}</h1>
                            <p><b>BookingId : {booking._id}</b></p>
                            <p><b>CheckIn : {booking.fromdate}</b></p>
                            <p><b>Check Out : {booking.todate}</b></p>
                            <p><b>Amount : {booking.totalamount}</b></p>
                            <p><b>Status : {booking.status == 'booked' ? 'CONFIRMED' : "CANCELLED"}</b></p>
                            <div className='text-right'>
                                <button className='btn btn-primary'>CANCEL BOOKING</button>
                            </div>
                        </div>
                    }))}
                </div>
            </div>
        </div>
    )
}

