import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import CardMedia from '@mui/material/CardMedia'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { isEmptyObject, parseIntToDollarsAndCents } from '../../utils/utilities'
import QuantitySelect from '../QuantitySelect/QuantitySelect'

const ProductDetail = ({isFaveFound, addToFavourites, removeFromFavourites, setNewQuantityForCartItem, cartItems, getCartItem, getItemFromInventory}) => {
  const [product, setProduct] = useState({})
  const [currentCartItem, setCurrentCartItem] = useState({})
  const [isLoading, setIsloading] = useState(true)
  const { category, subcategory, productId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    // const getProduct = (id, data) => {
    //   for (const category in data.products) {
    //     const productItem = data.products[category].find(item => item.id === id)
    //     if(!isEmptyObject(productItem)) {
    //       return productItem
    //     }
    //   }
    // }
    // const newProduct = getProduct(productId, data)
    const newProduct = getItemFromInventory(productId)
    const newCurrentCartItem = getCartItem(cartItems, productId)
    setProduct(newProduct)
    console.log('newCurrentCartItem', newCurrentCartItem!==undefined)
    if(newCurrentCartItem !== undefined && !isEmptyObject(newCurrentCartItem)) setCurrentCartItem(newCurrentCartItem)
    setIsloading(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems])

  const handleClickFave = (id) => {
    isFaveFound(id) ? removeFromFavourites(id) : addToFavourites(id)
}

  if (isLoading || isEmptyObject(product)) {
    console.log('product is empty and isLoading = ', isLoading)
    return <Typography variant="h4">Product {productId} not found</Typography> 
  } 
  console.log(product)
  const {id, name, description, image, amount, currency, quantityInStock} = product
  return (
    // <Box sx={{m: 'auto', minHeight: '100vh', overflowY: 'scroll'}}>
    <Container sx={{ marginTop: 3, marginBottom: 10}}>
      <Typography variant="h8" component="h4" gutterBottom>
          <span onClick={() => navigate('/')} role='link'>{category.toUpperCase()}</span>
          {'  >  '}
          <span onClick={() => navigate(`/${category}/${subcategory}`)} role='link'>{subcategory.toUpperCase()}</span>
          {'  >  '}
          <span onClick={() => navigate(`/${category}/${subcategory}/${id}`)} role='link'>{name.toUpperCase()}</span>
      </Typography>
      <Grid item xs={12} md={6} sx={{ mt: 3, position: 'relative'  }}>
        <Card sx={{ display: 'flex', maxHeight: '100vh', overflow: 'scroll'}}>
        {/* <Card sx={{ display: 'flex', overflow: 'scroll', position: 'relative' }}> */}
            {/* <Box sx={{ position: 'relative'}}> */}
              <CardMedia
                id={id}
                component="img"
                sx={{ width: '30rem', display: { xs: 'none', sm: 'block' } }}
                image={image}
                alt={name}
              />
              <CardContent>
                <Typography gutterBottom variant="body2" color='text.secondary' sx={{position:'absolute', bottom: 0, left:0, right:0, marginRight: 0, marginLeft: 'auto', zIndex: 10, background: 'rgba(255,255,255,0)'}}>
                  Product id: {id}
                </Typography>
              </CardContent>
            <Stack>
              <CardMedia
                id={id}
                component="img"
                sx={{ width: '30rem', display: { xs: 'block', sm: 'none' } }}
                image={image}
                alt={name}
              />
              <CardContent>
                  <Typography gutterBottom variant="h3" component="h2" sx={{fontWeight: 'bold'}}>
                      {name}
                  </Typography>
                  <Typography gutterBottom variant="h4" component="h2" sx={{fontWeight: 'bold'}}>
                      {`${currency} ${parseIntToDollarsAndCents(amount)}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                      {description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                      {'Aliqua consequat do ut amet non nostrud reprehenderit nisi exercitation. Ex occaecat exercitation nisi laboris sint anim mollit ipsum sit consectetur. Mollit veniam non minim anim ex exercitation qui deserunt culpa aliqua esse ad. Consequat irure elit elit nulla. Laborum eiusmod nostrud cupidatat aute officia aute ad tempor consequat.'}
                  </Typography>
              </CardContent>
              <Divider sx={{marginY: 2, marginX: 4}} role="presentation"></Divider>
              <CardContent>
                  <Stack direction="row" sx={{background: 'rgba(255,255,255,0)'}}>
                      {/* <IconButton onClick={() => handleClickCart(id)} aria-label={`add product id ${id} to cart`}>
                          <AddShoppingCartIcon id={`cart-${id}`} role='button' aria-label={`add product id ${id} to cart`} />
                      </IconButton> */}
                      <IconButton onClick={() => handleClickFave(id)} aria-label={`add product id ${id} to wishlist`}>
                          <FavoriteIcon id={`fav-${id}`} role='button' sx={{ color: isFaveFound(id) ? 'rgb(255,20,147)' : 'rgb(0,0,0, 0.35)'}} aria-label={`add product id ${id} to wishlist`}/>
                      </IconButton>
                      {/* <QuantitySelect {...{ id, quantity: (!isEmptyObject(currentCartItem)) ? currentCartItem.quantity : 1, setNewQuantityForCartItem, quantityInStock}}/> */}
                      <QuantitySelect {...{ id, quantity: (!isEmptyObject(currentCartItem)) ? currentCartItem.quantity : 0, setNewQuantityForCartItem, quantityInStock}}/>
                      <Typography variant="subtitle1" color={quantityInStock < 5 ? 'error.main' : 'success.main'}>
                        {quantityInStock < 5 ? 'Low In Stock' : 'In Stock'}
                      </Typography>
                  </Stack>
              </CardContent>
            </Stack>
        </Card>
      </Grid>
      
    </Container>
    // {/* </Box> */}
  )
}

export default ProductDetail