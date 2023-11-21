import { useEffect, useState } from 'react';
import ClienteForm from './Components/ClienteForm';
import { Button } from '@chakra-ui/react';
import { createRoot } from 'react-dom/client';
import ClientList from './Components/ClienteList';
import Header from './Components/Header';
import axios from 'axios';

// O desde otro paquete si estás usando otro framework de UI

function App() {

  const [user,setuser] = useState([]);

  const fetchData = () =>{
     return axios.get("https://localhost:7124/api/Clientes")
     .then((response)=>setuser(response.data))
  }

  useEffect(()=>{
    fetchData();

  },[])

  return (
    <>
    <div>
      <h1>Clientes</h1>
      <ul>
        {user && user.length>0 && user.map((userObj, index)=>(
          <li key={userObj.idIn}>{userObj.nombresVc}</li>
        ))}
      </ul>
    </div>
     <Header/>
    
    <ClientList/>
    {/* Utiliza ClienteForm */}
  </>
    
  );
}

export default App;
