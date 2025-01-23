import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from 'sweetalert2';
import { Divider, Flex, Tag } from 'antd';
const { TabPane } = Tabs;


function Profilescreen() {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    useEffect(() => {
        if (!user) {
            window.location.href = '/login';
        }
    }, [user]); // Ensure the check is done only when `user` changes.

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
    );
}

export default Profilescreen;

export function MyBookings() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to fetch bookings
    const fetchBookings = async () => {
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:5000/api/bookings/getbookingsbyuserid', { userid: user.id });
            setBookings(response.data); // Using the data from the axios response
            setLoading(false);
        } catch (err) {
            console.error("Error fetching bookings:", err);
            setError("Error fetching bookings.");
            setLoading(false);
        }
    };

    // useEffect to fetch bookings only if user is present and hasn't been fetched already
    useEffect(() => {
        if (user && user.id) {
            fetchBookings(); // Call the function to fetch bookings
        }
    }, [user._id]); // Dependency array with `user._id` ensures the fetch happens only once or when the user ID changes

    if (loading) return <Loader />; // Show loader if waiting for data
    if (error) return <Error message={error} />; // Show error message if there's an issue
    async function cancelBooking(bookingid, roomid) {
        try {
            setLoading(true)
            const result = await (await axios.post("http://localhost:5000/api/bookings/cancelbooking", { bookingid, roomid })).data
            console.log(result)
            setLoading(false)
            Swal.fire('Congrats', 'Your booking has been cancelled', 'Success').then(result => {
                window.location.reload()
            })
        } catch (error) {
            console.log(error)
            setLoading(false)
            Swal.fire('Oops', 'Something went wrong', 'Error')
        }
    }
    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    {/* Check if there are bookings to display */}
                    {bookings.length > 0 ? (
                        bookings.map((booking) => (
                            <div className="bs" key={booking._id}>
                                <h1>{booking.room}</h1>
                                <p><b>BookingId : {booking._id}</b></p>
                                <p><b>CheckIn : {booking.fromdate}</b></p>
                                <p><b>Check Out : {booking.todate}</b></p>
                                <p><b>Amount : {booking.totalAmount}</b></p>
                                <p><b>Status </b> : {""}
                                {booking.status == 'cancelled'?( <Tag color="red">CANCELLED</Tag>):( <Tag color="green">CONFIRMED</Tag>)}
                                </p>
                                {booking.status !== 'cancelled' && (
                                    <div className="text-right">
                                        <button className="btn btn-primary" onClick={() => { cancelBooking(booking._id, booking.roomid) }
                                        }>CANCEL BOOKING</button>
                                    </div>
                                )}


                            </div>
                        ))
                    ) : (
                        <p>No bookings found.</p> // Message if there are no bookings
                    )}
                </div>
            </div>
        </div>
    );
}
