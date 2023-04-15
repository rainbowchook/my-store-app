import React, { useContext } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { signOutUser } from '../../utils/firebase.utils'
import { Button, Typography, Container, Box, Stack, Paper, Grid, TextField, Avatar, FormControlLabel, Checkbox, Link } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person'
import { AuthContext } from '../../contexts/AuthContext'

const theme = createTheme();

const Profile = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOutUser()
    navigate('/')
  }

  const handleSubmit = async (e) => {

  }

  const handleClick = () => {}

  return (
    <Container sx={{ marginTop: 3, marginBottom: 10}}>
      <Typography variant="h8" component="h4" gutterBottom>
          Profile
      </Typography>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{bgcolor: 'rgb(25, 118, 210)', textDecoration: 'none', maxHeight:'inherit'}} src={(user !== null && user.photoURL !== null) ? user.photoURL : '/broken-image.jpg  '} alt={(user !== null && user.displayName !== null) ? user.displayName : ''}>{(user !== null && user.displayName !== null) ? `${user.displayName.split(' ')[0][0]}${user.displayName.split(' ')[1][0]}` : ''}</Avatar> 
          <Typography component="h1" variant="h5">
            Welcome {(user !== null && user.displayName != null) ? user.displayName : ''}
          </Typography>
          <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                <Container sx={{ mt: 2, mb: 2}} maxWidth="md">
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" component="h6" gutterBottom>
                            ORDER SUMMARY | {5} ITEM(S)
                        </Typography>
                        <Stack direction="row" sx={{mb: 3, mt: 2}}>
                            <Stack direction="row" sx={{width: 'fitContent', marginLeft: 10}}>
                                <Typography variant="string">
                                    Item(s) subtotal 
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={2} sx={{marginRight: 10, marginLeft: 'auto'}}>
                                <Typography variant="string">
                                    AUD {55.55}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack direction="row">
                            <Stack direction="row" sx={{width: 'fitContent', marginLeft: 10}}>
                                <Typography variant="h6" component="h6" gutterBottom>
                                    SUBTOTAL 
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={2} sx={{marginRight: 10, marginLeft: 'auto'}}>
                                <Typography variant="h6" component="h6" gutterBottom>
                                    AUD {55.55}
                                </Typography>
                            </Stack>
                        </Stack>
                        
                        <Stack direction="row">
                            <Stack direction="row" sx={{width: 'fitContent', marginLeft: 10}}>
                                <Typography variant="h5" component="h6" gutterBottom>
                                    ORDER TOTAL
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={2} sx={{marginRight: 10, marginLeft: 'auto'}}>
                                <Typography variant="h5" component="h6" gutterBottom>
                                    AUD {55.55}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Paper>
                </Container>
                <Stack sx={{ mt: 2, mb: 2, justifyContent: 'center'}} maxWidth="sm">
                    <Button 
                      fullWidth
                        variant='contained' 
                        sx={{mb: 2}} 
                        color='primary'
                        id='checkout-cart' 
                        onClick={handleClick}
                        aria-label='checkout cart'
                    >
                        Submit
                    </Button>
                     <Button 
                        fullWidth
                        variant='outlined' 
                        sx={{mb: 2}} 
                        color='primary'
                        id='continue-shopping' 
                        component={RouterLink}
                        to='/'
                        aria-label='continue shopping'
                    >
                        Reset
                    </Button>
                </Stack>
            </Box>
          </Box>
        <Button onClick={handleSignOut}>Sign Out</Button>
      </Container>
    </Container>
  )
}

export default Profile