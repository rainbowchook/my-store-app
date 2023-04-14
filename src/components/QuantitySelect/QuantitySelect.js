import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
// import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function QuantitySelect({ id, quantity, setNewQuantityForCartItem, quantityInStock = 10 }) {

  console.log({ id, quantity, setNewQuantityForCartItem, quantityInStock})
  const handleChange = (event) => {
    console.log('QuantitySelect target value', event.target.value)
    const newQuantity = event.target.value
    setNewQuantityForCartItem(id, newQuantity);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
        <InputLabel id="demo-simple-select-helper-label">Quantity</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={quantity}
          label="Quantity"
          onChange={handleChange}
        >
          { new Array(quantityInStock).fill(0).map((item, index) => (
                <MenuItem key={index} value={item + index + 1}>{item + index + 1}</MenuItem>
            )) }
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
        {/* <FormHelperText>Select quantity</FormHelperText> */}
      </FormControl>
    </div>
  );
}