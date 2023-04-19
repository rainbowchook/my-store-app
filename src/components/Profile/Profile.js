import React, { useContext, useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signOutUser } from '../../utils/firebase.utils'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Person from '@mui/icons-material/Person'
import { AuthContext } from '../../contexts/AuthContext'
import { getUserInfo, updateUserInfo } from '../../utils/firebase.utils';
import CustomToast, { Types } from '../CustomToast/CustomToast'

const initialFormData = {
  firstName: '',
  lastName: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  cityTownVillage: '',
  stateProvinceRegion: '',
  postCode: '',
  country: '',
}
const Profile = () => {
  const [ formData, setFormData ] = useState(initialFormData)
  const [ dateJoined, setDateJoined ] = useState('')
  const [ , setError ] = useState('')
  const [ toast, setToast ] = useState({ open: false, type: '', message: ''})
  const count = useRef(0)
  const formDataRef = useRef()
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserProfile = async (user) => {
      const res = await getUserInfo(user)
      if(res.error) {
        setError(res.error)
        setToast({ open: true, type: Types.ERROR, message: 'Unable to fetch user info'})
      } else {
        const userProfile = res
        setDateJoined(userProfile.creationDate)
        delete userProfile.displayName
        delete userProfile.email
        delete userProfile.creationDate
        count.current += 1
        if(count.current < 2) {
          formDataRef.current = {...formDataRef.current, ...userProfile}
        }
        setFormData({...formData, ...userProfile})
      }
    }
    fetchUserProfile(user)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSignOut = async () => {
    const signedOut = await signOutUser()
    if(!signedOut) { 
        setToast({ open: true, type: Types.ERROR, message: 'Unable to sign out'})
    } 
    navigate('/')
    setToast({ open: true, type: Types.SUCCESS, message: 'User signed out'})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget);
    const newUserData = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      phone: data.get('phone'),
      addressLine1: data.get('addressLine1'),
      addressLine2: data.get('addressLine2'),
      cityTownVillage: data.get('cityTownVillage'),
      stateProvinceRegion: data.get('stateProvinceRegion'),
      postCode: data.get('postCode'),
      country: data.get('country'),
    }

    const updateUserProfile = async (user, userData) => {
      const res = await updateUserInfo(user, userData)
      if(res.error) {
        setError(res.error)
        setToast({ open: true, type: Types.ERROR, message: 'Unable to update user data'})
      } else {
        setToast({ open: true, type: Types.SUCCESS, message: 'User profile data saved'})
        formDataRef.current = newUserData
      }
    }
    
    updateUserProfile(user, newUserData)
  }

  const handleReset = () => {
    setFormData({...formData, ...formDataRef.current})
    setToast({ open: true, type: Types.INFO, message: 'Form data reset without saving'})
  }

  const handleClickToShop = () => navigate('/')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({...formData, ...{[name]: value}})
  }
  const { firstName, lastName, phone, addressLine1, addressLine2, cityTownVillage, stateProvinceRegion, postCode, country } = formData
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
          <Avatar sx={{bgcolor: 'rgb(25, 118, 210)', textDecoration: 'none', height: '4em', width: '4em', p: 2}} alt={user.displayName != null ? user.displayName : 'B'} >
              {user.displayName != null 
                  ? `${user.displayName.split(' ')[0][0]}${user.displayName.split(' ')[1][0]}` 
                  : (
                      <Person sx={{fontSize: '3em'}} />
                  )
              }
          </Avatar> 
          <Typography component="h1" variant="h5">
            Welcome {(user !== null && user.displayName != null) ? user.displayName : ''}
          </Typography>
          <Typography component="h3" variant="h6">
            Email: {user.email}
          </Typography>
          <Typography component="h3" variant="h6">
            Date joined: {dateJoined}
            {/* {user.creationDate} */}
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={firstName}
                onChange={handleChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="family-name"
                name="lastName"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                value={lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete="tel"
                value={phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="addressLine1"
                label="Address Line 1"
                name="addressLine1"
                autoComplete="address-line1"
                value={addressLine1}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="addressLine2"
                label="Address Line 2"
                name="addressLine2"
                autoComplete="address-line2"
                value={addressLine2}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="cityTownVillage"
                label="City / Town / Village"
                id="cityTownVillage"
                autoComplete="address-level2"
                value={cityTownVillage}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="stateProvinceRegion"
                label="State / Province / Region"
                id="stateProvinceRegion"
                autoComplete="address-level1"
                value={stateProvinceRegion}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="postCode"
                label="Postal Code"
                id="postCode"
                autoComplete="postal-code"
                value={postCode}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="country"
                label="Country"
                id="country"
                autoComplete="country"
                value={country}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
            <Button 
              type="submit"
              fullWidth
              variant='contained' 
              sx={{ mt: 3, mb: 1 }}
              // color='primary'
              id='profile-submit' 
              // onClick={handleClick}
              aria-label='submit profile'
            >
              Submit
            </Button>
            <Button
              type="button"
              fullWidth
              variant="outlined"
              sx={{ mt: 1, mb: 1 }}
              onClick={handleReset}
              aria-label='reset profile'
            >
              Reset
            </Button>
            <Divider sx={{mt: 3, mb: 3}} role="presentation" />
            <Button
              id="profile-continue-shopping" 
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 1 }}
              aria-label="continue shopping"
              onClick={handleClickToShop}
            >
              Continue Shopping
            </Button>
            <Button 
              fullWidth
              variant='outlined' 
              sx={{ mt: 1, mb: 2 }}
              color='primary'
              id='profile-sign-out' 
              type="button"
              aria-label='sign out'
              onClick={handleSignOut}
            >
                Sign Out
            </Button>
          </Box>
        </Box>
      <CustomToast {...{toast, setToast}} />
      </Container>
    </Container>
  )
}

export default Profile