import { useState, useEffect, useContext } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
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
import AddressForm from '../AddressForm/AddressForm';
// import PaymentForm from '../PaymentForm/PaymentForm';
import Review from '../Review/Review';
import { AuthContext } from '../../contexts/AuthContext';
import { getUserInfo } from '../../utils/firebase.utils';

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

const steps = ['Shipping address', 'Billing address', 'Review your order'];

const initialFormData = {
  firstName: '',
  lastName: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  cityTownVillage: '',
  stateProvinceRegion: '',
  postCode: '',
  country: '',
}

export default function CheckoutForm({cartItems}) {
  const stripe = useStripe()
  const elements = useElements()
  const [ activeStep, setActiveStep ] = useState(0);
  const [ addressFormDataForShip, setAddressFormDataForShip ] = useState(initialFormData)
  const [ addressFormDataForBill, setAddressFormDataForBill ] = useState(initialFormData)
  const [ isShippingEqualBillingAddress, setIsShippingEqualBillingAddress ] = useState(true)
  const [ userData, setUserData ] = useState(null)
  const [ orderSummary, setOrderSummary ] = useState(null)
  const { user } = useContext(AuthContext)
  const [ error, setError ] = useState('')


  useEffect(() => {
    const fetchUserProfile = async (user) => {
      const res = await getUserInfo(user)
      console.log(res)
      if(res.error) {
        setError(res.error)
      } else {
        const userProfile = res
        console.log('1', userProfile)
        // setDateJoined(userProfile.creationDate)
        // delete userProfile.displayName
        // delete userProfile.email
        // delete userProfile.creationDate 
        // count.current += 1
        // console.log(count.current)
        // console.log('2', userProfile)
        // if(count.current < 2) {
          delete userProfile.displayName
          delete userProfile.email
          delete userProfile.creationDate 
        //   }
          setUserData({...userData, ...userProfile})
          setAddressFormDataForShip({...addressFormDataForShip, ...userProfile})
      }
    }
    fetchUserProfile(user)
  }, [])

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm addressFormData={addressFormDataForShip} setAddressFormData={setAddressFormDataForShip} {...{isShippingEqualBillingAddress, setIsShippingEqualBillingAddress}}/>;
      case 1:
        // return <PaymentForm />;
        return <AddressForm addressFormData={addressFormDataForBill} setAddressFormData={setAddressFormDataForBill} />;
      case 2:
        return <Review {...{cartItems, addressFormDataForShip, addressFormDataForBill, isShippingEqualBillingAddress, orderSummary, setOrderSummary}} />;
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
      setActiveStep(activeStep + 1 + isShippingEqualBillingAddress)
    // }
  }

  const handleBack = () => {
    // if(isShippingEqualBillingAddress) {
    //   setActiveStep(activeStep - 2)
    // } else {
      setActiveStep(activeStep - 1 - isShippingEqualBillingAddress)
    // }
  }

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
                Your order number is #2001539. We have emailed your order
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
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </Box>
            </>
          )}
        </Paper>
        {/* <Copyright /> */}
      </Container>

  );
}