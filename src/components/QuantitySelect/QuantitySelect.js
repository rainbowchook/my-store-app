import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function QuantitySelect({ id, quantity, setNewQuantityForCartItem, quantityInStock = 10 }) {

  const handleChange = (event) => {
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
                <MenuItem key={item + index + 1} value={item + index + 1}>{item + index + 1}</MenuItem>
            )) }
        </Select>
      </FormControl>
    </div>
  );
}