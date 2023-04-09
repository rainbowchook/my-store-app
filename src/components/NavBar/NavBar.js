import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import AdbIcon from '@mui/icons-material/Adb';
//need Context API to hold signin/signoff status, loading
const NavBar = () => {
  return (
    <div>
        <AdbIcon />
        <nav className='nav-bar'>
            <NavLink to="/" className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
            }>Categories</NavLink>
            <NavLink to="/signin" className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
            }>Categories</NavLink>
            <NavLink to="/" className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
            }>Sign Out</NavLink>
        </nav>
        <Outlet />
    </div>
  )
}

export default NavBar