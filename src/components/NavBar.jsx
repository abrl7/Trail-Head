import React from 'react'
import {NavLink} from "react-router-dom";


const NavBar = () => {
  return (
    <>
      <nav className='bg-pink-500 rounded-full text-white flex justify-between items-center px-5 mx-5 ' >
        <div className='logo px-5 text-3xl font-bold '>LOGO</div>
        <ul className=' flex gap-30 text-3xl justify-center items-center h-20 px-5'>
         <NavLink to="/trails" className={(e)=>{return e.isActive?"active-nav":""}} > <li>Trials</li> </NavLink>
          <NavLink to="/log" className={(e)=>{return e.isActive?"active-nav":""}}> <li>Log a Trial</li> </NavLink>
          <NavLink to="/stats" className={(e)=>{return e.isActive?"active-nav":""}}> <li>Stats</li> </NavLink>
        </ul>
      </nav>
    </>
  )
}

export default NavBar