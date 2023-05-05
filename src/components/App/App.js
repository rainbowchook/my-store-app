import { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import { CssBaseline, Container } from '@mui/material';
import NavBar from '../NavBar/NavBar';
import Home from '../Home/Home';
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
import { AuthProvider } from '../../contexts/AuthContext'
import {isCartItemFound, getCartItem, updateCartItem, addToExistingCartItem, addNewCartItem, removeFromExistingCartItem, clearCartItem, isFaveItem, addFaveItem, removeFaveItem, calculateCartCount} from '../../utils/utilities'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [error, setError] = useState('')
  const [cartItems, setCartItems] = useState([]) 
  const [cartCount, setCartCount] = useState(0)
  const [favourites, setFavourites] = useState([])

  const getItemFromInventory = (itemId) => {
    for(const category in data.products) {
      let foundItem = data.products[category].find(item => item.id === itemId)
      if(foundItem) return {...foundItem, ...{category}}
    }
  }

  const updateCartCount = (cartItems) => {
    const newCartCount = calculateCartCount(cartItems)
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
      }
    }
    setCartItems(newCartItems)
    updateCartCount(newCartItems)
  }
  //called by minus '-' or '<' button from shopping cart
  const removeItemFromCart = (id) => {
    if(!isCartItemFound(cartItems, id)) return
    const cartItemToRemove = getCartItem(cartItems, id)
    let newCartItems
    if(cartItemToRemove.quantity <= 1 && cartItemToRemove.quantity > 0) { //1 left
      newCartItems = clearCartItem(cartItems, id)
    } else {
      newCartItems = removeFromExistingCartItem(cartItems, id) //at least 2 left
    }
    setCartItems(newCartItems)
    updateCartCount(newCartItems)
  }
  //called by delete 'x' button from shopping cart
  const clearItemFromCart = (id) => {
    if(!isCartItemFound(cartItems, id)) return
    const newCartItems = clearCartItem(cartItems, id)
    setCartItems(newCartItems)
    updateCartCount(newCartItems)
  }

  const setNewQuantityForCartItem = (id, quantity) => {
    if(quantity === 0) clearItemFromCart(id)
    
    let newCartItems
    if(!isCartItemFound(cartItems, id)) {
      const newCartItem = getItemFromInventory(id)
      newCartItems = addNewCartItem(cartItems, {...newCartItem, ...{ quantity }})

    } else {
      const newCartItem = getCartItem(cartItems, id)
      newCartItems = updateCartItem(cartItems, {...newCartItem, ...{quantity}})
    }
    setCartItems(newCartItems)
    updateCartCount(newCartItems)
  }

  const isFaveFound = (id) => {
    return isFaveItem(favourites, id)
  }
  const addToFavourites = (id) => {
    if(isFaveItem(favourites, id)) return
    const newFavourites = addFaveItem(favourites, id)
    setFavourites(newFavourites)
  }

  const removeFromFavourites = (id) => {
    if(!isFaveItem(favourites, id)) return
    const newFavourites = removeFaveItem(favourites, id)
    setFavourites(newFavourites)
  }
  
  useEffect(() => {
      const fetchData = async () => {
          try {
            // const url = '/.netlify/functions/getShopData'
            const url = `https://us-central1-${process.env.REACT_APP_FIREBASE_PROJECT_ID}.cloudfunctions.net/getShopData`
            // const url = `http://127.0.0.1:5001/${process.env.REACT_APP_FIREBASE_PROJECT_ID}/us-central1/getShopData`
            const response = await fetch(url)
          if (!response.ok || response.status !== 200 || response.status >= 400) throw new Error('Unable to fetch data')
            const data = await response.json()
            setData(data)
          } catch (error) {
            setError(error.message) // for Network-related errors AND new Errors thrown from the try block ie HTTP 404
          } finally {
            setIsLoading(false)
          }
      }
      fetchData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

   return (
    <BrowserRouter>
      <CssBaseline enableColorScheme/>
      <AuthProvider>
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
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
