import { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddressForm from '../AddressForm/AddressForm';
import CircularProgress from '@mui/material/CircularProgress';
import Review from '../Review/Review';
import { AuthContext } from '../../contexts/AuthContext';
import { getUserInfo } from '../../utils/firebase.utils';
import { calculateCartSubtotal } from '../../utils/utilities'
import { addNewUserTransaction } from '../../utils/firebase.utils'

const steps = ['Shipping address', 'Payment details', 'Review your order'];

const initialFormData = { 
  firstName: '', 
  lastName: '', 
  phone: '', 
  addressLine1: '', 
  addressLine2: '', 
  cityTownVillage: '', 
  stateProvinceRegion: '',
  postCode: '', 
  country: '' 
}

export default function CheckoutForm({cartItems, setCartItems, setCartCount}) {
  const stripe = useStripe()
  const elements = useElements()
  const [activeStep, setActiveStep] = useState(0);
  const [addressFormDataForShip, setAddressFormDataForShip] = useState(initialFormData)
  const [addressFormDataForBill, setAddressFormDataForBill] = useState(initialFormData)
  const [isShippingEqualBillingAddress, setIsShippingEqualBillingAddress] = useState(true)
  const [userData, setUserData] = useState(null)
  const [, setError] = useState('')
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [subtotal, setSubtotal] = useState(0)
  const [transactionId, setTransactionId] = useState(0)
  const { user } = useContext(AuthContext)
  
  useEffect(() => {
    const fetchUserProfile = async (user) => {
      const res = await getUserInfo(user)
      if(res.error) {
        setError(res.error)
      } else {
        const userProfile = res
        setUserData({...userData, ...userProfile})
        setAddressFormDataForShip({...addressFormDataForShip, ...userProfile})
      }
    }
    fetchUserProfile(user)

    const newSubtotal = calculateCartSubtotal(cartItems)
    setSubtotal(newSubtotal)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useLayoutEffect(() => {
    window.scrollTo(0,0)   
  }, [cartItems])

  const handlePayment = async () => {
    if(!stripe || !elements) return
    setIsProcessingPayment(true)
    //fire request to backend server/serverless function for payment intent
    const url = '/.netlify/functions/create-payment-intent'
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({amount: subtotal})
    }).then(res => res.json())

    const { clientSecret } = response
    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: `${addressFormDataForBill.firstName} ${addressFormDataForBill.lastName}`,
          email: user.email,
        }
      }
    })

    setIsProcessingPayment(false)

    if(paymentResult.error) {
      alert(paymentResult.error.message) 
    } else {
        if(paymentResult.paymentIntent.status === "succeeded") {
          const { paymentIntent } = paymentResult
          const newUserTransaction = {
            transactionId: paymentIntent.id,
            amount: subtotal,
            currency: 'AUD',
            transactionTimestamp: paymentIntent.created,
            itemsPurchased: [cartItems]
          }
          const res = await addNewUserTransaction(user, newUserTransaction)
          setTransactionId(`TX-${paymentIntent.created}`)
          setActiveStep(activeStep + 1)
          setCartItems([])
          setCartCount(0)
        }
    }

  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm addressFormData={addressFormDataForShip} setAddressFormData={setAddressFormDataForShip} {...{isShippingEqualBillingAddress, setIsShippingEqualBillingAddress}}/>;
      case 1:
        return <AddressForm addressFormData={addressFormDataForBill} setAddressFormData={setAddressFormDataForBill} />;
      case 2:
        return <Review {...{subtotal, cartItems, addressFormDataForShip, addressFormDataForBill}} />;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = () => {
      if(isShippingEqualBillingAddress) {
        setAddressFormDataForBill({...addressFormDataForBill, ...addressFormDataForShip})
      } 
      if(activeStep < steps.length - 1) {
        setActiveStep(activeStep + 1 + isShippingEqualBillingAddress)
      }
      if(activeStep === steps.length - 1) {
        handlePayment()
      }
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1 - isShippingEqualBillingAddress);
  };

  return (
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is {transactionId}. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </>
          ) : (
            <>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  disabled={isProcessingPayment}
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {!isProcessingPayment ? (activeStep === steps.length - 1 ? 'Place order' : 'Next') : <CircularProgress />}
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>
  );
}