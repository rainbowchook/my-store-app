import {useState} from 'react'
import { NavLink, Link } from 'react-router-dom'
import AdbIcon from '@mui/icons-material/Adb';
import { Stack } from '@mui/system';
import './NavBar.css'
import "@fontsource/bubblegum-sans"
//need Context API to hold signin/signoff status, loading
const NavBar = () => {
    const [isSignedIn, setIsSignedIn] = useState(false)
  return (
    <Stack direction="row">
        <Stack direction="row" style={{width: 'fitContent', marginLeft: '10px', marginTop: '10px'}}>
            <Link to="/">
                <AdbIcon sx={{fontSize: 60}} color="primary" />
            </Link>
            <p style={{textTransform: 'uppercase', fontWeight: 'bolder', fontFamily: 'Bubblegum Sans, cursive', fontSize: 30, color: '#1976d2'}}>Blue Bug Boutique</p>
        </Stack>
        <Stack direction="row" sx={{marginRight: 10, marginLeft: 'auto', paddingY: 2}}>
            <nav className='nav-bar'>
                <NavLink to="/" className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                }>Home</NavLink> 
                {'   |   '}
                <NavLink to="/wishlist" className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                }>Wishlist</NavLink>
                {'   |   '}
                <NavLink to="/checkout" className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                }>Cart</NavLink>
                {'   |   '}
                {
                    !isSignedIn 
                        ? <NavLink to="/signin" className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active" : ""
                            }>Sign In</NavLink>
                        : <NavLink to="/" className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active" : ""
                            }>Sign Off</NavLink>
                }
                
                
            </nav>
        </Stack>
    </Stack>
  )
}

export default NavBar