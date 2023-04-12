import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Typography, Grid, Card, CardActionArea, CardMedia, CardContent, Stack, IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Wishlist = ({user, data, favourites, addItemToCart, isFaveFound, addToFavourites, removeFromFavourites}) => {
  const [favouriteItems, setFavouriteItems] = useState([])
  const navigate = useNavigate()
  
  useEffect(() => {
    const populateFavouriteItems = (favourites) => {
      if(!favourites.length) return []
      console.log(!favourites.length)
      // console.log(favouriteItems === favourites)
      console.log(favourites)
      // const newFavouriteItems = favourites.flatMap(favourite => {
      //   console.log('1 favourite', favourite)
      //   let newFavourite
      //   for(const category in data.products) {
      //     console.log('2 category', category)
      //     newFavourite = data.products[category]
      //       .filter(item => item.id === favourite)
      //       .map(item => ({...item, category}))
      //     console.log('3 newFavourite', newFavourite)
      //   }
      //   return newFavourite
      // })
      // console.log(newFavouriteItems)
      // return newFavouriteItems
      // return favourites.flatMap(favourite => {
      //     let newFavourite
      //     for(const category in data.products) {
      //       console.log(category)
      //       newFavourite = data.products[category]
      //         .filter(item => item.id === favourite)
      //         .map(item => ({...item, category}))
      //     }
      //     console.log(newFavourite)
      //     return newFavourite
      //   })
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
    console.log(newFavouriteItems)
    setFavouriteItems(newFavouriteItems)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favourites, data])

  // const handleClickCart = (e, id) => {
  //   console.log('handleClickCart', id)

  // }

  // const handleClickFave = (e, id) => {
  //   console.log(('handleClickFave', id))
  // }

  const handleClickNavigate = (e, category, subcategory) => {
    navigate(`/${category}/${subcategory}/${e.target.id}`)
  }

  const handleClickCart = (e, id) => {
    console.log(e.target)
    console.log(e.target.id)
    console.log('handleClickCart', id)
    addItemToCart(id)
    removeFromFavourites(id)
  }

  const handleClickFave = (e, id) => {
    console.log(e.target)
    console.log(e.target.id)
    console.log('handleClickFave', id)
    if(!isFaveFound(id)) return
    removeFromFavourites(id)
    // isFaveFound(id) ? removeFromFavourites(id) : addToFavourites(id)
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
                    // console.log('item', item)
                    return (
                        <Grid item xs={6} sm={4} md={3} key={`${name}-${id}`}>
                            <Card sx={{ maxWidth: 345, position: 'relative' }}>
                                <CardContent>
                                    {/* <Typography gutterBottom variant="h8" component="div" sx={{position:'absolute', top: 0, left:0, right:0, marginRight: 0, marginLeft: 'auto', zIndex: 10, background: 'rgba(255,255,255,0)'}}> */}
                                    {/* <Stack direction="row" sx={{position:'absolute', top: 0, left:0, right:0, marginRight: 0, marginLeft: 'auto', zIndex: 10, background: 'rgba(255,255,255,0)'}}> */}
                                    <Stack direction="row-reverse" sx={{background: 'rgba(255,255,255,0)'}}>
                                        <IconButton onClick={e => handleClickCart(e, id)} aria-label={`add product id ${id} to cart`}>
                                            <AddShoppingCartIcon id={`cart-${id}`} role='button' aria-label={`add product id ${id} to cart and remove from wishlist`} />
                                        </IconButton>
                                        { isFaveFound(id) &&
                                          <IconButton onClick={e => handleClickFave(e, id)} aria-label={`add product id ${id} to wishlist`}>
                                              {/* <FavoriteIcon id={`fav-${id}`} role='button' sx={{ color: 'rgb(255,20,147)'}} aria-label={`add product id ${id} to wishlist`}/> */}
                                              <FavoriteIcon id={`fav-${id}`} role='button' sx={{ color: isFaveFound(id) ? 'rgb(255,20,147)' : 'rgb(0,0,0, 0.35)'}} aria-label={`remove product id ${id} from wishlist`}/>
                                          </IconButton>
                                        }
                                    </Stack>
                                    {/* </Typography> */}
                                </CardContent>
                                <CardActionArea onClick={(e) => handleClickNavigate(e, category, subcategory, id)}>
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