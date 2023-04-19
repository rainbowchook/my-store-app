import * as React from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { parseIntToDollarsAndCents, calculateCartSubtotal } from '../../utils/utilities'

const products = [
  {
    name: 'Product 1',
    desc: 'A nice thing',
    price: '$9.99',
  },
  {
    name: 'Product 2',
    desc: 'Another thing',
    price: '$3.45',
  },
  {
    name: 'Product 3',
    desc: 'Something else',
    price: '$6.51',
  },
  {
    name: 'Product 4',
    desc: 'Best thing of all',
    price: '$14.11',
  },
  { name: 'Shipping', desc: '', price: 'Free' },
];

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

const addressShape = ['addressLine1', 'addressLine2', 'cityTownVillage', 'stateProvinceRegion', 'postCode', 'country']

export default function Review({cartItems, addressFormDataForShip, addressFormDataForBill, isShippingEqualBillingAddress, orderSummary, setOrderSummary}) {
  const [subtotal, setSubtotal] = React.useState(0)
  // const stripe = useStripe()
  // const elements = useElements()
  console.log(addressFormDataForShip)
  React.useEffect(() => {
    const newSubtotal = calculateCartSubtotal(cartItems)
    setSubtotal(newSubtotal)
  }, [cartItems])

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary & Payment
      </Typography>
      <List disablePadding>
        { cartItems.length && 
            cartItems.map(item => {
              const {id, name, description, image, amount, currency, quantity, quantityInStock, category, subcategory} = item 
              console.log(item) 
              return (
                <ListItem key={`${id}-${name}`} sx={{ py: 1, px: 0 }}>
                  <ListItemText primary={name} secondary={description} />
                  <Typography variant="body2">{parseIntToDollarsAndCents(quantity * amount)}</Typography>
                </ListItem>
              )
            })
        }
        {/* {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))} */}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            AUD {parseIntToDollarsAndCents(subtotal)}
          </Typography>
        </ListItem>
        {/* <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $34.06
          </Typography>
        </ListItem> */}
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          {
            addressFormDataForShip != null && (
              <React.Fragment>
                <Typography gutterBottom>{`${addressFormDataForShip.firstName ?? ''} ${addressFormDataForShip.lastName ?? ''}`}</Typography>
                {
                  addressShape.map((addressItem, index) => <Typography key={addressItem} sx={{lineHeight: 1}} gutterBottom>{addressFormDataForShip[addressItem]}{index < (addressShape.length - 1) ? ', ' : ''}</Typography>)
                }
              </React.Fragment>
            )
          }
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Billing
          </Typography>
          {
            addressFormDataForBill != null && (
              <React.Fragment>
                <Typography gutterBottom>{`${addressFormDataForBill.firstName ?? ''} ${addressFormDataForBill.lastName ?? ''}`}</Typography>
                {
                  addressShape.map((addressItem, index) => <Typography sx={{lineHeight: 1}} gutterBottom>{`${addressFormDataForBill[addressItem]}${index < (addressShape.length - 1) ? ', ' : ''}`}</Typography>)
                }
              </React.Fragment>
            )
          }
        </Grid>
        <Grid item container direction="column" xs={12} sm={8}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment 
          </Typography>
          <CardElement />
          {/* <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid> */}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}