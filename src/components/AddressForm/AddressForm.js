import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function AddressForm({ addressFormData, setAddressFormData, ...props }) {
  // const [ formData, setFormData ] = useState({})
  const { isShippingEqualBillingAddress, setIsShippingEqualBillingAddress } = props

  const handleChange = (e) => {
    const { name, value } = e.target
    setAddressFormData({...addressFormData, ...{[name]: value}})
  }

  const handleChecked = (e) => {
    console.log(e.target.checked)
    setIsShippingEqualBillingAddress(e.target.checked)
  }
  console.log(addressFormData)
  if(addressFormData !== undefined) {
    const { firstName, lastName, phone, addressLine1, addressLine2, cityTownVillage, stateProvinceRegion, postCode, country } = addressFormData
    return (
      <>
        <Typography variant="h6" gutterBottom>
          { isShippingEqualBillingAddress !== undefined ? 'Shipping' : 'Billing' } address
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              value={firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              value={lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="addressLine1"
              name="addressLine1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
              value={addressLine1}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="addressLine2"
              name="addressLine2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
              variant="standard"
              value={addressLine2}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="cityTownVillage"
              name="cityTownVillage"
              label="cityTownVillage"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
              value={cityTownVillage}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="stateProvinceRegion"
              name="stateProvinceRegion"
              label="State/Province/Region"
              fullWidth
              variant="standard"
              value={stateProvinceRegion}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="postCode"
              name="postCode"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
              value={postCode}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              variant="standard"
              value={country}
              onChange={handleChange}
            />
          </Grid>
          {
            (props.isShippingEqualBillingAddress !== undefined && props.setIsShippingEqualBillingAddress !== undefined) && (
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      color="secondary" 
                      name="isShippingEqualBillingAddress" 
                      value={isShippingEqualBillingAddress} 
                      onChange={handleChecked} 
                      checked={isShippingEqualBillingAddress}
                    />
                  }
                  label="Use this address for payment details"
                />
              </Grid>
            )
          }
          
        </Grid>
      </>
    );
  }
  
}