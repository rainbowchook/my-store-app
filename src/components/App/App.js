import { useEffect, useState, useContext } from 'react';
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
import ProductDetail from '../ProductDetail/ProductDetail';
import SubCategory from '../SubCategory/SubCategory';
import Wishlist from '../Wishlist/Wishlist.js';
import Cart from '../Cart/Cart';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import StickyFooter from '../StickyFooter/StickyFooter';
// import { AuthProvider } from '../../contexts/AuthContext'
import {isCartItemFound, getCartItem, updateCartItem, addToExistingCartItem, addNewCartItem, removeFromExistingCartItem, clearCartItem, isFaveItem, getFaveItem, addFaveItem, removeFaveItem, calculateCartCount} from '../../utils/utilities'
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
  // const [isSignedIn, setIsSignedIn] = useState(false) //move to AuthContext
  const [cartItems, setCartItems] = useState([]) //move to UserContext
  const [cartCount, setCartCount] = useState(0)
  const [favourites, setFavourites] = useState([])
  // const [user, setUser] = useState(initialUser) //get displayName, email, favourites, cartItems in UserContext
  const getUrl = () => {
    // if (process.env.NODE_ENV !== 'production') {
    //   return '/data/data.json'
    // }
    return '/.netlify/functions/getShopData'
  } 

  const getItemFromInventory = (itemId) => {
    for(const category in data.products) {
      let foundItem = data.products[category].find(item => item.id === itemId)
      console.log(foundItem, {...foundItem, ...{category}})
      if(foundItem) return {...foundItem, ...{category}}
    }
  }

  const updateCartCount = (cartItems) => {
    console.log('updateCartCount cartItems', cartItems)
    const newCartCount = calculateCartCount(cartItems)
    console.log(newCartCount)
    setCartCount(newCartCount)
  }

  const addItemToCart = (id) => {
    let newCartItems
    if(!isCartItemFound(cartItems, id)) {
      const newCartItem = getItemFromInventory(id)
      newCartItems = addNewCartItem(cartItems, newCartItem)
    } else {
      const { quantity, quantityInStock } = getCartItem(cartItems, id)
      if(quantity !== quantityInStock) {
        newCartItems = addToExistingCartItem(cartItems, id)
      } else {
        return alert('Not enough stock')
        // return { error: 'Not enough stock'} //toastify it?
      }
    }
    setCartItems(newCartItems)
    updateCartCount(newCartItems)
  }
  //called by minus '-' or '<' button from shopping cart
  const removeItemFromCart = (id) => {
    // const cartItemIndex = isCartItemFound(cartItems, id)
    console.log('removeItemFromCart', id)
    console.log(isCartItemFound(cartItems, id))
    if(!isCartItemFound(cartItems, id)) return
    const cartItemToRemove = getCartItem(cartItems, id)
    console.log(cartItemToRemove)
    let newCartItems
    if(cartItemToRemove.quantity <= 1 && cartItemToRemove.quantity > 0) {
      newCartItems = clearCartItem(cartItems, id)
      console.log('1 left')
    } else {
      newCartItems = removeFromExistingCartItem(cartItems, id)
      console.log('at least 2 left')
    }
    console.log(newCartItems)
    setCartItems(newCartItems)
    updateCartCount(newCartItems)
  }
  //called by delete 'x' button from shopping cart
  const clearItemFromCart = (id) => {
    // const cartItemIndex = isCartItemFound(cartItems, id)
    // if(cartItemIndex < 0) return
    if(!isCartItemFound(cartItems, id)) return
    const newCartItems = clearCartItem(cartItems, id)
    setCartItems(newCartItems)
    updateCartCount(newCartItems)
  }

  const setNewQuantityForCartItem = (id, quantity) => {
    // let newCartItems
    // if(!isCartItemFound(cartItems, id)) {
    //   const newCartItem = getItemFromInventory(id)
    //   newCartItems = addNewCartItem(cartItems, newCartItem)
    // } else {
    //   newCartItems = addToExistingCartItem(cartItems, id)
    // }
    // setCartItems(newCartItems)
    // updateCartCount(newCartItems)
    console.log('setNewQuantityForCartItem: id, quantity', {id, quantity})
    if(quantity === 0) clearItemFromCart(id)
    console.log(isCartItemFound(cartItems, id))
    // if(!isCartItemFound(cartItems, id)) return
    let newCartItems
    if(!isCartItemFound(cartItems, id)) {
      const newCartItem = getItemFromInventory(id)
      console.log(newCartItem, quantity)
      newCartItems = addNewCartItem(cartItems, {...newCartItem, ...{ quantity }})
      console.log(newCartItems, quantity)

    } else {
      const newCartItem = getCartItem(cartItems, id)
      console.log(newCartItem)
      newCartItems = updateCartItem(cartItems, {...newCartItem, ...{quantity}})
      console.log(newCartItems)
    }
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

  
  // const signIn = (signinData) => {
  //   const {email, password} = signinData
  //   //pull data from user authentication and firestore
  //   console.log('in App signIn fn', {email, password})
  //   const newUser = {
  //     displayName: 'Annie Smith',
  //     email,
  //     favourites: [],
  //   }
  //   setUser(newUser)
  //   setIsSignedIn(true)
  // }
  
  useEffect(() => {
      // setIsLoading(true)
      const fetchData = async () => {
          try {
            const url = getUrl()
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
      <NavBar {...{cartItems, cartCount, favourites}}/>
      {
        error && error.length ? <p>{error}</p> : (
          isLoading || data.length === 0 ? <p>Loading...</p> : (
            <Container sx={{marginBottom: 10}}>
              <Routes>
                <Route path="*" element={<NotFound />} />
                <Route index path="/" element={<Home {...{data}}/>} />
                <Route exact path="signin" element={<SignIn />} />
                <Route exact path="signup" element={<SignUp />} />
                <Route exact path=":category/:subcategory" element={<SubCategory {...{data, favourites, addItemToCart, isFaveFound, addToFavourites, removeFromFavourites}}/>} />
                <Route exact path=":category/:subcategory/:productId" element={<ProductDetail {...{isFaveFound, addToFavourites, removeFromFavourites, setNewQuantityForCartItem, cartItems, getCartItem, getItemFromInventory}}/>} />
                <Route exact path="cart" element={<Cart {...{cartItems, cartCount, addItemToCart, removeItemFromCart, clearItemFromCart, setNewQuantityForCartItem}} />} />
                <Route exact path="checkout" 
                  element={
                    <ProtectedRoute>
                      <Checkout {...{cartItems, setCartItems, setCartCount}} />
                    </ProtectedRoute>
                    } 
                  />
                <Route exact path="wishlist" 
                  element={
                    <ProtectedRoute>
                      <Wishlist {...{data, favourites, addItemToCart, isFaveFound, removeFromFavourites}} />
                    </ProtectedRoute>
                  } 
                />
                <Route exact path="profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </Container>
          )
        )
        
      }
      <StickyFooter {...{data}}/>
    </>
  )
}

export default App;
