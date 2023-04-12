import {useState} from 'react'
import { NavLink, Link } from 'react-router-dom'
import AdbIcon from '@mui/icons-material/Adb';
import { Stack, Avatar, Badge, IconButton } from '@mui/material';
import './NavBar.css'
import "@fontsource/bubblegum-sans"
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
//need Context API to hold signin/signoff status, loading
const NavBar = ({isSignedIn, setIsSignedIn, cartItems, user, cartCount, favourites}) => {
    // const [isSignedIn, setIsSignedIn] = useState(false)
    const notificationsLabel = (count) => {
        if (count === 0) {
        return 'no notifications';
        }
        if (count > 99) {
        return 'more than 99 notifications';
        }
        return `${count} notifications`;
    }
    
  return (
    <Stack direction="row">
        <Stack direction="row" style={{width: 'fitContent', marginLeft: '10px', marginTop: '10px'}}>
            <Link to="/">
                <AdbIcon sx={{fontSize: 60}} color="primary" />
            </Link>
            <p style={{textTransform: 'uppercase', fontWeight: 'bolder', fontFamily: 'Bubblegum Sans, cursive', fontSize: 30, color: '#1976d2'}}>Blue Bug Boutique</p>
        </Stack>
        {/* <Stack direction="row" spacing={2} sx={{marginRight: 20, marginLeft: 'auto', paddingY: 2}}> */}
        <Stack direction="row" spacing={2} sx={{marginRight: 20, marginLeft: 'auto', paddingY: 2}}>
            <nav className='nav-bar'>
                <NavLink to="/" className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                }>
                    <IconButton aria-label='home-link'>
                        <HomeIcon fontSize='large'/>
                    </IconButton>
                </NavLink> 
                <NavLink to="/wishlist" className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                }>
                    <IconButton aria-label={notificationsLabel(favourites.length)}>
                        <Badge color="secondary" badgeContent={favourites.length} max={99}>
                            <FavoriteIcon fontSize='large'/>
                        </Badge>
                    </IconButton>
                </NavLink>
                <NavLink to="/checkout" className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                }>
                    <IconButton aria-label={notificationsLabel(cartCount)}>
                        <Badge color="secondary" badgeContent={cartCount} max={99}>
                            <ShoppingCartIcon fontSize='large'/>
                        </Badge>
                    </IconButton>
                </NavLink>
                { !isSignedIn 
                    ? <NavLink to="/signin" className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }>
                            <Avatar sx={{maxHeight:'inherit'}} /> 
                        </NavLink>
                    : <NavLink to="/" className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }>  
                            <Avatar sx={{bgcolor: 'rgb(25, 118, 210)', textDecoration: 'none', maxHeight:'inherit'}} alt={user.displayName}>{`${user.displayName.split(' ')[0][0]}${user.displayName.split(' ')[1][0]}`}</Avatar> 
                        </NavLink>
                }

                {/* <NavLink to="/" className={({ isActive, isPending }) =>
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
                            }>  <Avatar sx={{bgColor: '#1976d2', textDecoration: 'none'}}>T U</Avatar> </NavLink>
                } */}
                
                
            </nav>
        </Stack>
    </Stack>
  )
}

export default NavBar