import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { CssBaseline, Container } from '@mui/material';
import NavBar from '../NavBar/NavBar';
import Home from '../Home/Home';
import Category from '../Category/Category';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import NotFound from '../NotFound/NotFound';
import Checkout from '../Checkout/Checkout';
import Profile from '../Profile/Profile'
import Footer from '../Footer/Footer';
import CategoryDetail from '../CategoryDetail/CategoryDetail';
import SubCategory from '../SubCategory/SubCategory';
import Wishlist from '../Wishlist/Wishlist.js';
import Cart from '../Cart/Cart';
import StickyFooter from '../StickyFooter/StickyFooter';

// import data from '../../data/data.json'

const initialUser = {
  displayName: 'Test User',
  email: 'test@test.com',
  favourites: [],
}

function App() {
  const [isLoading, setIsLoading] = useState(true) //custom hook for isLoading
  const [data, setData] = useState([])
  const [error, setError] = useState('')
  const [isSignedIn, setIsSignedIn] = useState(false) //move to AuthContext
  const [cartItems, setCartItems] = useState([]) //move to UserContext
  const [cartCount, setCartCount] = useState(0)
  const [favourites, setFavourites] = useState([])
  const [user, setUser] = useState(initialUser) //get displayName, email, favourites, cartItems in UserContext
  const url = '/data/data.json'
  console.log(favourites ? true:false)
  const isCartItemFound = (cartItems, itemId) => {
    return cartItems.findIndex(cartItem => cartItem.id === itemId) < 0 ? false : true
  }

  const getCartItem = (cartItems, itemId) => {
    return cartItems.find(cartItem => cartItem.id === itemId)
  }

  const updateCartItem = (cartItems, item) => {
    return cartItems.map(cartItem => cartItem.id === item.id ? item : cartItem)
  }

  const addToExistingCartItem = (cartItems, itemId) => {
    return cartItems.map(cartItem => cartItem.id === itemId ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem)
  }

  const addNewCartItem = (cartItems, itemId) => {
    return [...cartItems, {id: itemId, quantity: 1}]
  }

  const removeFromExistingCartItem = (cartItems, itemId) => {
    return cartItems.map(cartItem => cartItem.id !== itemId ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem)
  }

  const clearCartItem = (cartItems, itemId) => {
    return cartItems.filter(cartItem => cartItem.id !== itemId)
  }

  const isFaveItem = (favourites, itemId) => {
    return favourites.findIndex(faveItem => faveItem === itemId) < 0 ? false : true
  }

  const getFaveItem = (favourites, itemId) => {
    return favourites.find(faveItem => faveItem === itemId)
  }

  const addFaveItem = (favourites, itemId) => {
    return [...favourites, itemId]
  }

  const removeFaveItem = (favourites, itemId) => {
    return favourites.filter(faveItem => faveItem !== itemId)
  }

  const calculateCartCount = (cartItems) => {
    return cartItems.reduce((acc, curr) => acc + curr.quantity
    , 0)
  }

  const updateCartCount = (cartItems) => {
    console.log('updateCartCount cartItems', cartItems)
    const newCartCount = calculateCartCount(cartItems)
    console.log(newCartCount)
    setCartCount(newCartCount)
  }

  //called by add '+' or '>' button from shopping cart
  const addItemToCart = (id) => {
    // console.log(e.target.id)
    // if(!e.target.id) return
    // const cartItemIndex = isCartItemFound(cartItems, id)
    let newCartItems
    if(!isCartItemFound(cartItems, id)) {
      newCartItems = addNewCartItem(cartItems, id)
    } else {
      newCartItems = addToExistingCartItem(cartItems, id)
    }
    setCartItems(newCartItems)
    updateCartCount(newCartItems)
  }
  //called by minus '-' or '<' button from shopping cart
  const removeItemFromCart = (id) => {
    // const cartItemIndex = isCartItemFound(cartItems, id)
    if(!isCartItemFound(cartItems, id)) return
    const cartItemToRemove = getCartItem(cartItems, id)
    let newCartItems
    if(cartItemToRemove.quantity === 1) {
      newCartItems = clearCartItem(cartItems, id)
    } else {
      newCartItems = removeFromExistingCartItem(cartItems, id)
    }
    setCartItems(newCartItems)
    updateCartCount(newCartItems)
  }
  //called by delete 'x' button from shopping cart
  const clearItemFromCart = (id) => {
    const cartItemIndex = isCartItemFound(cartItems, id)
    if(cartItemIndex < 0) return
    const newCartItems = clearCartItem(cartItems, id)
    setCartItems(newCartItems)
    updateCartCount(newCartItems)
  }

  const setNewQuantityForCartItem = (id, quantity) => {
    const cartItemIndex = isCartItemFound(cartItems, id)
    if(cartItemIndex < 0) return
    const newCartItems = updateCartItem(cartItems, {id, quantity})
    setCartItems(newCartItems)
    updateCartCount(newCartItems)
  }

  const isFaveFound = (id) => {
    return isFaveItem(favourites, id)
  }
  const addToFavourites = (id) => {
    // console.log(e.target)
    console.log('fav add',id)
    if(isFaveItem(favourites, id)) return
    const newFavourites = addFaveItem(favourites, id)
    setFavourites(newFavourites)
  }

  const removeFromFavourites = (id) => {
    console.log('fav remove', id)
    if(!isFaveItem(favourites, id)) return
    const newFavourites = removeFaveItem(favourites, id)
    setFavourites(newFavourites)
  }

  
  const signIn = (signinData) => {
    const {email, password} = signinData
    //pull data from user authentication and firestore
    console.log('in App signIn fn', {email, password})
    const newUser = {
      displayName: 'Annie Smith',
      email,
      favourites: [],
    }
    setUser(newUser)
    setIsSignedIn(true)
  }
  
  useEffect(() => {
      // setIsLoading(true)
      const fetchData = async () => {
          try {
          const response = await fetch(url)
          if (!response.ok || response.status !== 200 || response.status >= 400) throw new Error('Unable to fetch data')
            const data = await response.json()
            setData(data)
          } catch (e) {
            setError(error.message) // for Network-related errors AND new Errors thrown from the try block ie HTTP 404
          } finally {
            setIsLoading(false)
          }
      }
      fetchData()
      // console.log(data)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

   return (
    <>
      <CssBaseline enableColorScheme/>
      <BrowserRouter>
        <NavBar {...{isSignedIn, setIsSignedIn, cartItems, user, cartCount, favourites}}/>
        {
          error && error.length ? <p>{error}</p> : (
            isLoading || data.length === 0 ? <p>Loading...</p> : (
              <Container sx={{marginBottom: 10}}>
                <Routes>
                  <Route path="*" element={<NotFound />} />
                  <Route index path="/" element={<Home {...{data}}/>} />
                  <Route exact path="signin" element={<SignIn {...{signIn}}/>} />
                  <Route exact path="signup" element={<SignUp />} />
                  <Route exact path="wishlist" element={<Wishlist user={user} favourites={favourites} />} />
                  <Route exact path=":category" element={<Category />} />
                  <Route exact path=":category/:subcategory" element={<SubCategory {...{data, favourites, addItemToCart, isFaveFound, addToFavourites, removeFromFavourites}}/>} />
                  <Route exact path=":category/:subcategory/:id" element={<CategoryDetail />} />
                  <Route exact path="checkout" element={<Checkout />} />
                  <Route exact path="cart" element={<Cart />} />
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
        {/* <Footer /> */}
        <StickyFooter />
      </BrowserRouter>
    </>
  )
}

export default App;
