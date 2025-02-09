import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter , Routes , Route , Link } from 'react-router-dom'
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Loginscreen from './screens/Loginscreen';
import Registerscreen from './screens/Registerscreen';
import Profilescreen from './screens/Profilescreen';
import Adminscreen from './screens/Adminscreen';
import Landingscreen from './screens/Landingscreen'
import ReviewForm from './screens/ReviewForm';



function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route path="/home" element={<Homescreen />} />
      <Route path="/book/:roomid/:fromdate/:todate" element={<Bookingscreen />} />
      <Route path="/register" element={<Registerscreen/>}/>
      <Route path='/login' element={<Loginscreen/>}/>
      <Route path='/profile' element={<Profilescreen/>}/>
      <Route path = '/admin' element={<Adminscreen/>}/>
      <Route path = '/' element= {<Landingscreen/>}/>
      <Route path="/review" element={<ReviewForm/>} />
    
     
      
      </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
