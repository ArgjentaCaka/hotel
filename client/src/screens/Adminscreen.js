import React, { useState, useEffect } from "react";
import { Tabs } from 'antd';
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";



const { TabPane } = Tabs;
function Adminscreen() {
 
    useEffect(()=>{
    if( !JSON. parse(localStorage.getItem("currentUser")).isAdmin){
       window.location.href = '/home'
    }
    },[]

    )
    return (
        <div className='mt-3 ml-3 mr-3 bs '  >

            <h2 className="text-center" style={{ fontSize: '30px' }}><b>Admin Panel</b></h2>

            <Tabs defaultActiveKey="1">
                <TabPane tab="Bookings" key="1">
                    <Bookings />
                </TabPane>
                <TabPane tab="Rooms" key="2">
                    <Rooms/>
                </TabPane>
                <TabPane tab="Add Room" key="3">
                    <h1>Add Room</h1>
                </TabPane>
                <TabPane tab="Users " key="4">
                   <Users/>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Adminscreen;

export function Bookings() {

    const [bookings, setbookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await axios.get("http://localhost:5000/api/bookings/getallbookings");
                setbookings(data.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(error);
            }
        };

        fetchData(); // Kjo është mënyra e saktë për të thirrur funksionin async
    }, []); // Sigurohuni që efekti të ekzekutohet vetëm një herë



    return (
        <div className="row">
            <div className="col-md-10">

                <h1>Bookings</h1>
                {loading && (<Loader />)}
                <table className="table table-bordered table-dark">
                    <thead className="bs " >
                        <tr>
                            <th>    Booking Id  </th>
                            <th>User Id </th>
                            <th>Room</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody> {bookings.length && (bookings.map(booking => {
                        return <tr>
                            <td>
                                {booking._id}
                            </td>
                            <td>{booking.userid}</td>
                            <td>{booking.room}</td>
                            <td>{booking.fromdate}</td>
                            <td>{booking.todate}</td>
                            <td>{booking.status}</td>
                        </tr>
                    }))}</tbody>
                </table>

            </div>
        </div>
    );
}


export function Rooms() {
    const [rooms, setRooms] = useState([]);  // Sigurohuni që rooms të jetë gjithmonë një varg
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/rooms/getallrooms");
          if (Array.isArray(response.data)) {
            setRooms(response.data);  // Përdorni të dhënat nëse janë një varg
          } else {
            console.error("Të dhënat nuk janë varg i duhur");
            setError("Data format is incorrect.");
          }
          setLoading(false);
        } catch (err) {
          console.error(err);
          setLoading(false);
          setError(err);
        }
      };
      fetchData();
    }, []);
  
    return (
      <div className="row">
        <div className="col-md-12">
          <h1>Rooms</h1>
          {loading && <Loader />}
          {error && <div className="alert alert-danger">Failed to load rooms: {error.message}</div>}
          {!loading && !error && (
            <table className="table table-bordered table-dark">
              <thead>
                <tr>
                  <th>Room Id</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Rent Per Day</th>
                  <th>Max Count</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {rooms.length > 0 &&
                  rooms.map((room, index) => (
                    <tr key={index}>
                      
                      <td>{room._id}</td>

                      <td>{room.name}</td>
                      <td>{room.type}</td>
                      <td>{room.rentperday}</td>
                      <td>{room.maxcount}</td>
                      <td>{room.phonenumber}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
export function Users(){
    const [users, setusers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/users/getallusers");
                setusers(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(error);
            }
        };
        fetchData();
    }, []);
    

    return(
        <div className="row">
            <div className="col-md-12">
             <h1>Users</h1>
             {loading}
             <table className='table table-dark table-bordered'>
                <thead>
                    <tr>
                        <th>
                            User Id
                        </th>
                        <th> Name</th>
                        <th>Email</th>
                        <th>Is Admin</th>
                    </tr>
                </thead>

                <tbody>{users && (users.map(user=>
                    {return <tr>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.isAdmin ? 'YES' : 'NO' }</td>
                    </tr>}
                ))}</tbody>

             </table>
            </div>
            </div>
    )
}