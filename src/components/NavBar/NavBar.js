import { NavLink, Link } from 'react-router-dom'
import AdbIcon from '@mui/icons-material/Adb';
import Stack from '@mui/material/Stack'
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import './NavBar.css'
import "@fontsource/bubblegum-sans"
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountMenu from '../AccountMenu/AccountMenu';

const NavBar = ({cartCount, favourites}) => {

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
            <Typography variant='body1' sx={{mt: 3, textTransform: 'uppercase', fontWeight: 'bolder', fontFamily: 'Bubblegum Sans, cursive', fontSize: 30, color: '#1976d2'}}>Blue Bug Boutique</Typography>
        </Stack>
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
                <NavLink to="/cart" className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                }>
                    <IconButton aria-label={notificationsLabel(cartCount)}>
                        <Badge color="secondary" badgeContent={cartCount} max={99}>
                            <ShoppingCartIcon fontSize='large'/>
                        </Badge>
                    </IconButton>
                </NavLink>
                <AccountMenu />
            </nav>
        </Stack>
    </Stack>
  )
}

export default NavBar