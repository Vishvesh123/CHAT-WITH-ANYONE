import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'

function Private() {
const auth =localStorage.getItem("myItem");
  return auth?<Outlet/>:<Navigate to="/login"/>
    
  
}

export default Private