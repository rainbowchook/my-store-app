import { useState }from 'react';
import { useNavigate, Link as RouterLink} from 'react-router-dom';
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
import { createUserFromAuth, signInUser, signInUserWithGoogle } from '../../utils/firebase.utils'
import Copyright from '../Copyright/Copyright';

export default function SignIn() {
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const formData = {
      email: data.get('email'),
      password: data.get('password'),
    }
    const { email, password } = formData
    const res = await signInUser(email, password)
    if(res.error) {
      setError('Unable to sign in' + res.error)
    } else {
      navigate('/')
    }
  };

  const handleSignInWithPopup = async (e) => {
    const res = await signInUserWithGoogle()
    if(res.error) { 
      setError('Unable to sign in ' + res.error)
    } else {
      const userDocRef = await createUserFromAuth(res)
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
          Sign in
        </Typography>
        { error &&
            <Typography variant="body2" color='error.main'>
              {error}
            </Typography>
        }
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
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
            Sign In With Google
          </Button>
          <Grid container>
            <Grid item xs>
              <Link variant="body2" component={RouterLink} to='/resetpass'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link variant="body2" component={RouterLink} to='/signup'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}