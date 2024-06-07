import React from 'react';
import "../components/css/sidebar.css";
import { Link,useNavigate } from 'react-router-dom';

import logo from "../components/images/logo.png";
import loginIcon from "../components/images/loginIcon.png";
import logoutIcon from "../components/images/logoutIcon.png";
import userIcon from "../components/images/userIcon.png";
import roomIcon from "../components/images/roomIcon.png";


function Sidebar() {
    const auth=localStorage.getItem("myItem")
    const navigate=useNavigate();

   

const handleLogout=()=>{
  localStorage.clear();
  navigate("/");
 
}
  return (
    <div className='Sidebar'>
    {auth? <>
        <p>Chat With Anyone</p>
        <img src={logo} alt='' width="70%"/>
        <h2><img src={userIcon} alt='' width="18%"/> {JSON.parse(localStorage.getItem('myItem'))}</h2>
        <Link to="/room" ><img src={roomIcon} alt='' width="20%"/>Find Room</Link>
        <Link to="/" onClick={handleLogout} ><img src={logoutIcon} alt='' width="20%"/> Logout</Link>
       </>:
       <>
       <div className='Beforelogin'>
       <p>Chat With Anyone</p>
     <img src={logo} alt='' width="70%"/>
     <h3>Login to Chat!</h3>
       <Link to="/login" ><img src={loginIcon} alt='' width="20%"/>Login</Link>
       </div>
       
       </>
       }
   
    </div>
  )
}

export default Sidebar