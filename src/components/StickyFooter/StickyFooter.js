import * as React from 'react';
// import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import IconButton from '@mui/material/IconButton';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Blue Bug Boutique
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      {/* <CssBaseline /> */}
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <Typography variant="h4" component="h4" gutterBottom>
          Previously purchased
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {'Pin a footer to the bottom of the viewport.'}
          {'The footer will move as the main element of the page grows.'}
        </Typography>
        <Typography variant="body1">Sticky footer placeholder. (Can add 'Previously purchased' and 'May interest you' based on previous clicks or purchases - extension features)</Typography>
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Typography sx={{ minWidth: 100 }} variant="body1">
              Find us here:
            </Typography>
            {/* <Typography sx={{ minWidth: 100 }}>Contact</Typography>
            <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}
            <Link color="inherit" href="https://mui.com/" target="_blank" rel="noopener" aria-label="To learn more, visit the Facebook page which opens in a new window.">
              <IconButton aria-label={'facebook-link'}>
                <FacebookIcon fontSize='large'/>
              </IconButton>
            </Link>{' '}
            <Link color="inherit" href="https://mui.com/" target="_blank" rel="noopener" aria-label="To learn more, visit the Instagram page which opens in a new window.">
              <IconButton aria-label={'facebook-link'}>
                <InstagramIcon fontSize='large'/>
              </IconButton>
            </Link>{' '}
            <Link color="inherit" href="https://mui.com/" target="_blank" rel="noopener" aria-label="To learn more, visit the Twitter page which opens in a new window.">
              <IconButton aria-label={'facebook-link'}>
                <TwitterIcon fontSize='large'/>
              </IconButton>
            </Link>{' '}
            <Link color="inherit" href="https://mui.com/" target="_blank" rel="noopener" aria-label="To learn more, visit the LinkedIn page which opens in a new window.">
              <IconButton aria-label={'facebook-link'}>
                <LinkedInIcon fontSize='large'/>
              </IconButton>
            </Link>{' '}
          </Box>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}