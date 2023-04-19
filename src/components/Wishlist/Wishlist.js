import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
// import { Container, Typography, Grid, Card, CardActionArea, CardMedia, CardContent, Stack, IconButton } from '@mui/material'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { AuthContext } from '../../contexts/AuthContext';

const Wishlist = ({data, favourites, addItemToCart, isFaveFound, removeFromFavourites}) => {
  const [favouriteItems, setFavouriteItems] = useState([])
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  
  useEffect(() => {
    const populateFavouriteItems = (favourites) => {
      if(!favourites.length) return []
      return favourites.map(favourite => {
        let newFav
        for(const category in data.products) {
          let newFavouriteItem = data.products[category].find(item => item.id === favourite)
          if(newFavouriteItem) {
            newFav = {...newFavouriteItem, category}
          }
        }
        return newFav
      })
      
    }
    const newFavouriteItems = populateFavouriteItems(favourites)
    setFavouriteItems(newFavouriteItems)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favourites, data])

  const handleClickNavigate = (e, category, subcategory) => {
    navigate(`/${category}/${subcategory}/${e.target.id}`)
  }

  const handleClickCart = (id) => {
    addItemToCart(id)
    removeFromFavourites(id)
  }

  const handleClickFave = (id) => {
    if(!isFaveFound(id)) return
    removeFromFavourites(id)
  }

  return (
    <Container sx={{ marginTop: 3, marginBottom: 10}}>
      <Typography variant="h4" component="h4" gutterBottom>
        {user.displayName}'s wishlist
      </Typography>
      {
        !favourites.length 
          ? <Typography gutterBottom variant="h8" component="div" sx={{fontWeight: 'small'}}>
              ... is currently empty.  Add products to wishlist when signed in.
            </Typography>
          : (
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                {favouriteItems.map(item => {
                    const {id, name, description, image, amount, currency, subcategory, category} = item 
                    return (
                        <Grid item xs={6} sm={4} md={3} key={`${name}-${id}`}>
                            <Card sx={{ maxWidth: 345, height: 320, position: 'relative' }}>
                                <CardContent>
                                    <Stack direction="row-reverse" sx={{background: 'rgba(255,255,255,0)'}}>
                                        <IconButton onClick={() => handleClickCart(id)} aria-label={`add product id ${id} to cart`}>
                                            <AddShoppingCartIcon id={`cart-${id}`} role='button' aria-label={`add product id ${id} to cart and remove from wishlist`} />
                                        </IconButton>
                                        { isFaveFound(id) &&
                                          <IconButton onClick={() => handleClickFave(id)} aria-label={`add product id ${id} to wishlist`}>
                                              <FavoriteIcon id={`fav-${id}`} role='button' sx={{ color: isFaveFound(id) ? 'rgb(255,20,147)' : 'rgb(0,0,0, 0.35)'}} aria-label={`remove product id ${id} from wishlist`}/>
                                          </IconButton>
                                        }
                                    </Stack>
                                </CardContent>
                                <CardActionArea onClick={(e) => handleClickNavigate(e, category, subcategory)}>
                                    <CardMedia
                                    id={id}
                                    component="img"
                                    height="140"
                                    width="205"
                                    image={image}
                                    alt={name}
                                    />
                                </CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h8" component="div" sx={{fontWeight: 'small'}}>
                                        {`${name}  |  ${currency}${amount}`}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        )
                    })
                }
            </Grid>
          )
      }
    </Container>
    
  )
}

export default Wishlist