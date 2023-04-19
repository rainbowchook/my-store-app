import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '../CheckoutForm/CheckoutForm'
import { calculateCartCount } from '../../utils/utilities';

const STRIPE_PUBLIC_API_KEY = process.env.REACT_APP_STRIPE_PUBLIC_API_KEY
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(STRIPE_PUBLIC_API_KEY);

const Checkout = ({cartItems}) => {
  const [ clientSecret, setClientSecret ] = useState('')
  const amount = calculateCartCount(cartItems)
  const url = '/.netlify/create-payment-intent' 
  
  // useEffect(() => {
  //   // Create PaymentIntent as soon as the page loads
  //   fetch(url, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ amount }),
  //   })
  //     .then((response) => {
  //       if (response.ok || response.status !== 200 || response.status >= 400) return Promise.reject(response)
  //       return response.json()
  //     })
  //     .then((data) => setClientSecret(data.clientSecret))
  //     .catch((error) => {
  //       console.log(error.message)
  //     });
  // }, [])

  const appearance = {
    theme: 'stripe'
  }

  const options = {
    clientSecret,
    appearance
  }

  return (
    // <>
    //   {
    //     clientSecret && (
          <Elements stripe={stripePromise}>
            <CheckoutForm {...{cartItems, amount}} />
          </Elements>
    //     )
    //   }
      
    // </>
  )
}

export default Checkout