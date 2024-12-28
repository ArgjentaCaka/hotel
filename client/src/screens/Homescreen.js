import React ,{useState , useEffect} from 'react'
import axios from "axios";
function Homescreen({someId}) {
    const [rooms, setrooms] = useState();
    
    useEffect (()=> {
      async function fetchData (){
        try {
            const response = await axios.get('/api/rooms/getallrooms');
            setrooms (response.data);

        } catch (error) {
            console.log(error);
        }
      }
        
        fetchData();

        // Pastrimi (cleanup) nëse është e nevojshme (kjo mund të jetë opsionale)
        return () => {
          // Mund të bëni pastrimin këtu nëse keni nevojë për ndonjë gjë
        };
      }, [someId]);
  return (
    <div><h1>Home screen </h1>
     <h1>There are {Array.isArray(rooms) ? rooms.length : 0} rooms</h1>
    <pre>{JSON.stringify(rooms, null, 2)}</pre>
    </div>
  );
}

export default Homescreen