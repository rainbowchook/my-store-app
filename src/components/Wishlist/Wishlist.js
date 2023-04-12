import React from 'react'
import {Container, Typography} from '@mui/material'

const Wishlist = ({user}) => {
  return (
    <Container>
      {/* <h1>{user}'s wish list</h1> */}
      <Typography variant="h4" component="h4" gutterBottom>
        {user.displayName}'s wish list
      </Typography>
    </Container>
    
  )
}

export default Wishlist