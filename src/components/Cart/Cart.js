import {Container, Typography} from '@mui/material'

const Cart = ({user}) => {
  return (
    <Container>
      {/* <h1>{user}'s wish list</h1> */}
      <Typography variant="h4" component="h4" gutterBottom>
        Shopping Cart
      </Typography>
    </Container>
  )
}

export default Cart