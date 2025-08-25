import React from 'react'
import {Outlet} from "react-router-dom"



import Footer from '../Component/Footer'
import Navbar from '../Component/Navbar'
export default function MainLayout() {
  return (
    <div>
        <Navbar/>
        <div className="container">
          <Outlet/>
          <Footer/>
        </div>
        
    </div>
  )
}
