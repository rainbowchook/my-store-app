import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { CssBaseline, Container } from '@mui/material';
import NavBar from '../NavBar/NavBar';
import Home from '../Home/Home';
import Category from '../Category/Category';
import SignIn from '../SignIn/SignIn';
import Register from '../SignOn/SignOn';
import NotFound from '../NotFound/NotFound';
import Checkout from '../Checkout/Checkout';
import Profile from '../Profile/Profile'
import Footer from '../Footer/Footer';
import CategoryDetail from '../CategoryDetail/CategoryDetail';
import SubCategory from '../SubCategory/SubCategory';
import Wishlist from '../Wishlist/Wishlist.js';


// import data from '../../data/data.json'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [error, setError] = useState('')
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [favourites, setFavourites] = useState([])
  const url = '/data/data.json'
  
  const addToCart = (e) => {
    console.log(e.target.id)
    setCartItems([...cartItems, e.target.id])
  }

  const addToFavourites = (e) => {
    console.log(e.target.id)
    setFavourites([...favourites, e.target.id])
  }
  
  useEffect(() => {
      // setIsLoading(true)
      const fetchData = async () => {
          try {
          const response = await fetch(url)
          if (!response.ok || response.status !== 200 || response.status >= 400) throw new Error('Unable to fetch data')
            const data = await response.json()
            setData(data)
            // setIsLoading(false)
          } catch (e) {
          setError(error.message) // for Network-related errors AND new Errors thrown from the try block ie HTTP 404
          // setIsLoading(false)
          } finally {
            setIsLoading(false)
          }
      }
      fetchData()
      // console.log(data)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

      // if(error && error.length) return <p>{error}</p>
      // if(isLoading || data.length === 0) return <p>Loading...</p> 
      
   return (
    <>
      <CssBaseline enableColorScheme/>
      <BrowserRouter>
        <NavBar {...{isSignedIn, setIsSignedIn, cartItems, favourites}}/>
        {
          error && error.length ? <p>{error}</p> : (
            isLoading || data.length === 0 ? <p>Loading...</p> : (
              <Container sx={{marginBottom: 10}}>
                <Routes>
                  <Route path="*" element={<NotFound />} />
                  <Route index path="/" element={<Home {...{data}}/>} />
                  <Route exact path="signin" element={<SignIn />} />
                  <Route exact path="register" element={<Register />} />
                  <Route exact path="wishlist" element={<Wishlist user={'testuser'}/>} />
                  <Route exact path=":category" element={<Category />} />
                  <Route exact path=":category/:subcategory" element={<SubCategory {...{data, addToCart, addToFavourites}}/>} />
                  <Route exact path=":category/:subcategory/:id" element={<CategoryDetail />} />
                  <Route exact path="checkout" element={<Checkout />} />
                  <Route exact path="profile/:user" element={<Profile />} />
                </Routes>
              </Container>
              
            )
          )
          
        }
        {/* <Routes>
          <Route path="*" element={<NotFound />} />
          <Route index path="/" element={<Home {...{data}}/>} />
          <Route exact path="signin" element={<SignIn />} />
          <Route exact path="register" element={<Register />} />
          <Route exact path="wishlist" element={<Wishlist user={'testuser'}/>} />
          <Route exact path=":category" element={<Category />} />
          <Route exact path=":category/:subcategory" element={<SubCategory {...{data}}/>} />
          <Route exact path=":category/:subcategory/:id" element={<CategoryDetail />} />
          <Route exact path="checkout" element={<Checkout />} />
          <Route exact path="profile/:user" element={<Profile />} />
        </Routes> */}
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App;
