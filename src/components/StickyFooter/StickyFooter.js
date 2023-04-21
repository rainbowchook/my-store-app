import { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import IconButton from '@mui/material/IconButton';
import { AuthContext } from '../../contexts/AuthContext';
import { getUserInfo } from '../../utils/firebase.utils';
import Snippet from '../Snippet/Snippet';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://prismatic-bonbon-51d1ae.netlify.app">
        Blue Bug Boutique
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function StickyFooter({data}) {
  const [ productsSnippet, setProductsSnippet ] = useState([])
  const [ recentlyPurchased, setRecentlyPurchased ] = useState([])
  const { user } = useContext(AuthContext)

  useEffect(() => {
    const getProductsSnippet = (data) => {
      let randomArray = []
      const randomProducts = {}
      for(const category in data.products) {
        let randomItem1 = data.products[category].at(Math.floor(data.products[category].length * Math.random()))
        let randomItem2 = data.products[category].at(Math.floor(data.products[category].length * Math.random()))
        const mappedArray = [randomItem1, randomItem2].map(item => ({...item, ...{category}}))
        randomProducts[category] = mappedArray
      }
      Object.keys(randomProducts).forEach(category => {
        randomArray = [...randomArray, ...randomProducts[category]]
      })
      return randomArray
      
    }
    const newProducstSnippet = (data !== undefined && data.length !== 0) ? getProductsSnippet(data) : []
    setProductsSnippet(newProducstSnippet)
  }, [data])

  useEffect(() => {
    const fetchUserProfile = async (user) => {
      const res = await getUserInfo(user)
      if(res.error) {
        console(res.error)
      } else {
        const userProfile = res
        if(userProfile !== undefined && userProfile.recentlyPurchased === undefined && userProfile.recentlyPurchased !== null) {
          setRecentlyPurchased(userProfile.recentlyPurchased)
        }
      }
    }
    if (user !== null) fetchUserProfile(user)
  }, [user])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <Typography variant="h5" component="h5" gutterBottom>
          { (recentlyPurchased !== undefined && recentlyPurchased.length) ? 'Recently Purchased' : 'Products That May Interest You'}
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
          {recentlyPurchased !== undefined && 
            (recentlyPurchased.length !== 0 
              ? ( recentlyPurchased.map((item, index) => <Snippet key={index} {...{item}}/>) )
              : ( productsSnippet.map((item, index) => <Snippet key={index} {...{item}}/>) )
            )
          }
          {recentlyPurchased !== undefined 
            ? (recentlyPurchased.length !== 0 && recentlyPurchased.map(item => <Snippet {...{item}}/>))
            : productsSnippet.map(item => <Snippet {...{item}}/>)
          }
        </Grid>
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