import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { CssBaseline } from '@mui/material';
import NavBar from '../NavBar/NavBar';
import Home from '../Home/Home';
import Category from '../Category/Category';
import SignIn from '../SignIn/SignIn';
import Register from '../Register/Register';
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
  const url = '/data/data.json'
  
  useEffect(() => {
      setIsLoading(true)
      const fetchData = async () => {
          try {
          const response = await fetch(url)
          if (response.ok) {
              const data = await response.json()
              setData(data)
              setIsLoading(false)
          } else {
              throw new Error('Unable to fetch data') // for HTTP 404 errors
          }
          } catch (e) {
          setError(error) // for Network-related errors AND new Errors thrown from the try block ie HTTP 404
          setIsLoading(false)
          }
      }
      fetchData()
      console.log(data)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
      if(error) return <p>{error}</p>
      if(isLoading || data.length === 0) return <p>Loading...</p> 
      
   return (
    <>
      <CssBaseline enableColorScheme/>
      <BrowserRouter>
        <NavBar />
        <Routes>
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
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App;
