import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from '../NavBar/NavBar';
import Home from '../Home/Home';
// import Category from '../Category/Category';
import SignIn from '../SignIn/SignIn';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import Checkout from '../Checkout/Checkout';
import Profile from '../Profile/Profile'
import Footer from '../Footer/Footer';
import CategoryDetail from '../CategoryDetail/CategoryDetail';
import SubCategory from '../SubCategory/SubCategory';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <>
      <CssBaseline enableColorScheme/>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route index path="/" element={<Home />} />
          <Route exact path="signin" element={<SignIn />} />
          <Route exact path="register" element={<Register />} />
          <Route exact path=":category/:subcategory" element={<SubCategory />} />
          <Route exact path=":category/:subcategory/:id" element={<CategoryDetail />} />
          <Route exact path="checkout" element={<Checkout />} />
          <Route exact path="profile/:user" element={<Profile />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
