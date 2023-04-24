import * as React from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { parseIntToDollarsAndCents, calculateCartSubtotal } from '../../utils/utilities'

const addressShape = ['addressLine1', 'addressLine2', 'cityTownVillage', 'stateProvinceRegion', 'postCode', 'country']

export default function Review({cartItems, addressFormDataForShip, addressFormDataForBill}) {
  const [subtotal, setSubtotal] = React.useState(0)
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
              return (
                <ListItem key={`${id}-${name}`} sx={{ py: 1, px: 0 }}>
                  <ListItemText primary={name} secondary={description} />
                  <Typography variant="body2">{parseIntToDollarsAndCents(quantity * amount)}</Typography>
                </ListItem>
              )
            })
        }
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            AUD {parseIntToDollarsAndCents(subtotal)}
          </Typography>
        </ListItem>
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
                  addressShape.map((addressItem, index) => <Typography key={`${addressItem}${Date.now()}`} sx={{lineHeight: 1}} gutterBottom>{`${addressFormDataForBill[addressItem]}${index < (addressShape.length - 1) ? ', ' : ''}`}</Typography>)
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
        </Grid>
      </Grid>
    </React.Fragment>
  );
}