import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '../CheckoutForm/CheckoutForm'

const STRIPE_PUBLIC_API_KEY = process.env.REACT_APP_STRIPE_PUBLIC_API_KEY
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const promise = loadStripe();

const Checkout = ({cartItems}) => {
<<<<<<< HEAD
  const [ clientSecret, setClientSecret ] = useState('')
  const amount = calculateCartCount(cartItems)
  const url = '/.netlify/create-payment-intent' 
=======
>>>>>>> 61d051f567b70c6897ab479f6b40c54d05bf8690
  
  return (
    <>
      <Elements stripe={promise}>
        <CheckoutForm {...{cartItems}} />
      </Elements>
    </>
  )
}

export default Checkout