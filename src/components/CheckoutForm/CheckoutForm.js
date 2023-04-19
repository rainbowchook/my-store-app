import { useState, useEffect, useContext } from 'react';
import { PaymentElement, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from '../AddressForm/AddressForm';
import CircularProgress from '@mui/material/CircularProgress';
// import PaymentForm from '../PaymentForm/PaymentForm';
import Review from '../Review/Review';
import { AuthContext } from '../../contexts/AuthContext';
import { getUserInfo } from '../../utils/firebase.utils';
import { parseIntToDollarsAndCents, calculateCartSubtotal } from '../../utils/utilities'
import { addNewUserTransaction } from '../../utils/firebase.utils'

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Shipping address', 'Payment details', 'Review your order'];

// function getStepContent(step) {
//   switch (step) {
//     case 0:
//       return <AddressForm />;
//     case 1:
//       return <PaymentForm />;
//     case 2:
//       return <Review />;
//     default:
//       throw new Error('Unknown step');
//   }
// }
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
export default function CheckoutForm({cartItems}) {
  const stripe = useStripe()
  const elements = useElements()
  const [activeStep, setActiveStep] = useState(0);
  const [addressFormDataForShip, setAddressFormDataForShip] = useState(initialFormData)
  const [addressFormDataForBill, setAddressFormDataForBill] = useState(initialFormData)
  const [isShippingEqualBillingAddress, setIsShippingEqualBillingAddress] = useState(true)
  const [userData, setUserData] = useState(null)
  const [orderSummary, setOrderSummary] = useState(null)
  const [error, setError] = useState('')
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [subtotal, setSubtotal] = useState(0)
  const [transactionId, setTransactionId] = useState(0)
  const { user } = useContext(AuthContext)
  
  useEffect(() => {
    const fetchUserProfile = async (user) => {
      const res = await getUserInfo(user)
      console.log(res)
      if(res.error) {
        setError(res.error)
      } else {
        const userProfile = res
        console.log('1', userProfile)
        setUserData({...userData, ...userProfile})
        setAddressFormDataForShip({...addressFormDataForShip, ...userProfile})
      }
    }
    fetchUserProfile(user)

    const newSubtotal = calculateCartSubtotal(cartItems)
    setSubtotal(newSubtotal)

  }, [])

  const handlePayment = async () => {
    console.log('inside handlePayment()')
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
    console.log(response)
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
    console.log(paymentResult)
    if(paymentResult.error) {
      console.log(paymentResult)
      alert(paymentResult.error.message) //create a component to alert error
    } else {
        if(paymentResult.paymentIntent.status === "succeeded") {
          console.log(paymentResult)
          const { paymentIntent } = paymentResult
          console.log(paymentIntent)
          const newUserTransaction = {
            transactionId: paymentIntent.id,
            amount: subtotal,
            currency: 'AUD',
            transactionTimestamp: paymentIntent.created,
            itemsPurchased: [cartItems]
          }
          const res = await addNewUserTransaction(user, newUserTransaction)
          console.log(res)
        alert('Payment')
        setTransactionId(`TX-${paymentIntent.created}`)
        setActiveStep(activeStep + 1)
        }
    }

  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm addressFormData={addressFormDataForShip} setAddressFormData={setAddressFormDataForShip} {...{isShippingEqualBillingAddress, setIsShippingEqualBillingAddress}}/>;
      case 1:
        // return <PaymentForm />;
        return <AddressForm addressFormData={addressFormDataForBill} setAddressFormData={setAddressFormDataForBill} />;
      case 2:
        return <Review {...{subtotal, cartItems, addressFormDataForShip, addressFormDataForBill, isShippingEqualBillingAddress, orderSummary, setOrderSummary}} />;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = () => {
    // if(isShippingEqualBillingAddress) {
    //   setActiveStep(activeStep + 2)
    // } else {
      if(isShippingEqualBillingAddress) {
        setAddressFormDataForBill({...addressFormDataForBill, ...addressFormDataForShip})
      } 
      if(activeStep < steps.length - 1) {
        setActiveStep(activeStep + 1 + isShippingEqualBillingAddress)
      }
      if(activeStep === steps.length - 1) {
        handlePayment()
        //fire Stripe transaction - if isLoading ( disabled the button until transaction succeeds )
        //if transaction succeeded, update cartItems into user's recentlyPurchased
        //if not succeeded, show screen with error
      }
    // }
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