import { useState } from 'react';
import {useNavigate, Link as RouterLink} from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { signUpUser, signInUserWithGoogle } from '../../utils/firebase.utils'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignUp() {
  const [error, setError] = useState('')
  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.currentTarget)
    const data = new FormData(e.currentTarget);
    if(data.get('password1') !== data.get('password2')) {
      return setError('Please try again. Passwords do not match.')
    }
    const formData = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password1')
    }
    console.log(e.currentTarget)
    console.log(e.target.node)
    console.log(formData)
    console.log(typeof data.get('password1'))
    setError('')

    const { firstName, lastName, email, password} = formData
    const res = await signUpUser(firstName, lastName, email, password)
    if(res.error) { 
      setError('Unable to sign up. ' + res.error)
    } else {
      navigate('/profile')
    }
  };

  const handleSignInWithPopup = async (e) => {
    const res = await signInUserWithGoogle()
    if(res.error) { 
      setError('Unable to sign up. ' + res.error)
    } else {
      navigate('/profile')
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        { error &&
            <Typography variant="body2" color='error.main'>
              {error}
            </Typography>
        }
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
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password1"
                label="Password"
                type="password"
                id="password1"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                id="password2"
                autoComplete="new-password"
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
            variant="contained"
            sx={{ mt: 3, mb: 1 }}
          >
            Sign Up
          </Button>
          <Button
            id="google-signin" 
            type="button"
            fullWidth
            variant="outlined"
            sx={{ mt: 1, mb: 2 }}
            aria-label="google signin"
            onClick={handleSignInWithPopup}
          >
            Sign Up With Google
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link variant="body2" component={RouterLink} to='/signin'>
                {/* Don't use the href provided here - useNavigate instead or else state wiped out - can consider keeping cart items and user session token in browser localStorage */}
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}