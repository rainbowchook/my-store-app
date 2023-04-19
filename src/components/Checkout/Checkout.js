import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '../CheckoutForm/CheckoutForm'

const STRIPE_PUBLIC_API_KEY = process.env.REACT_APP_STRIPE_PUBLIC_API_KEY
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const promise = loadStripe(STRIPE_PUBLIC_API_KEY);

const Checkout = ({cartItems, setCartItems, setCartCount}) => {
  
  return (
    <>
      <Elements stripe={promise}>
        <CheckoutForm {...{cartItems, setCartItems, setCartCount}} />
      </Elements>
    </>
  )
}

export default Checkout