import { useContext, useState, useRef, useEffect }from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Person from '@mui/icons-material/Person';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Login from '@mui/icons-material/Login'
import Logout from '@mui/icons-material/Logout';
import { AuthContext } from '../../contexts/AuthContext';
import { signOutUser } from '../../utils/firebase.utils';

export default function AccountMenu() {
  const { user, isSignedIn } = useContext(AuthContext)
  const [anchorEl, setAnchorEl] = useState(null);
  const signedIn = useRef()
  const navigate = useNavigate()
  const open = Boolean(anchorEl);

  useEffect(() => {
    signedIn.current = isSignedIn
  }, [signedIn])
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = async (action) => {
    setAnchorEl(null);
    console.log(action)
    switch(action) {
        case 'signin': 
            navigate('/signin')
            break;
        case 'register': 
            navigate('/signup')
            break;
        case 'profile': 
            navigate('/profile')
            break;
        case 'signoff': 
            const signedOut = await signOutUser()
            if(signedOut) {
                console.log('Unable to sign out')  
            } 
            navigate('/')
            break;
        default:
            break;
    }
  };
  return (
    <>
      {/* <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}> */}
        {/* <Typography sx={{ minWidth: 100 }}>Contact</Typography>
        <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {/* <Avatar sx={{ width: 32, height: 32 }}>M</Avatar> */}
            {/* { !isSignedIn
                ? <NavLink to="/signin" className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }>
                        <Avatar sx={{maxHeight:'inherit'}} /> 
                    </NavLink>
                : <NavLink to="/" className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }>  
                        <Avatar sx={{bgcolor: 'rgb(25, 118, 210)', textDecoration: 'none', maxHeight:'inherit'}} alt={user.displayName != null ? user.displayName : 'B'}>{user.displayName != null && `${user.displayName.split(' ')[0][0]}${user.displayName.split(' ')[1][0]}`}</Avatar> 
                    </NavLink>
            } */}
            { !isSignedIn
                ? <Avatar sx={{maxHeight:'inherit'}} /> 
                : <Avatar sx={{bgcolor: 'rgb(25, 118, 210)', textDecoration: 'none', maxHeight:'inherit'}} alt={user.displayName != null ? user.displayName : 'B'}>
                        {user.displayName != null 
                            ? `${user.displayName.split(' ')[0][0]}${user.displayName.split(' ')[1][0]}` 
                            : (
                                <Person />
                            )
                        }
                    </Avatar> 
            }
          </IconButton>
        </Tooltip>
      {/* </Box> */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        { !isSignedIn &&
            <MenuItem onClick={() => handleClose('signin')}>
                <ListItemIcon>
                    <Login fontSize="small" />
                </ListItemIcon>
                Sign In
            </MenuItem>
        }   
        { !isSignedIn &&
            <MenuItem onClick={() => handleClose('register')}>
                <ListItemIcon>
                    <PersonAdd fontSize="small" />
                </ListItemIcon>
                Register
            </MenuItem>
        }
        { isSignedIn &&
            <MenuItem onClick={() => handleClose('profile')}>
                <Avatar /> Profile
            </MenuItem>
        }
        { isSignedIn &&
            <MenuItem onClick={() => handleClose('signoff')}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem>
        }
      </Menu>
    </>
  );
}