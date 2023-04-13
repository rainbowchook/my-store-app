import { useState, useEffect } from 'react'
import {Container, Typography} from '@mui/material'
import {Grid, Card, CardActionArea, CardMedia, } from '@mui/material'
const Wishlist = ({user, favourites, data}) => {
  const [favouriteItems, setFavouriteItems] = useState([])
  
  // useEffect(() => {
  //   const populateFavouriteItems = (favouriteItems) => {
  //     let newFavourites
  //     // for(const category in data.products) {
  //     //   newFavourites = category.filter(item => item.id === ).map(favourite => )
  //     // }
  //     // return newFavourites
  //   }
  //   const newFavouriteItems = populateFavouriteItems(favouriteItems)
  //   setFavouriteItems(newFavouriteItems)
  // }, [])

  return (
    <Container>
      {/* <h1>{user}'s wish list</h1> */}
      <Typography variant="h4" component="h4" gutterBottom>
        {user.displayName}'s wish list
      </Typography>
      {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
        {
          favourites.map( subcat => {
            const {id, name, description, image, subcategory} = subcat
            return (
                <Grid item xs={6} sm={4} md={3} key={`${name}-${id}`}>
                    <Card key={id} sx={{ maxWidth: 345 }}>
                        <CardActionArea onClick={handleClick}>
                            <CardMedia
                                name={`${category}-${subcategory}`}
                                component="img"
                                height="140"
                                width="205"
                                image={image}
                                alt={name}
                            />
                        </CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {subcategory}
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
    </Grid> */}
    </Container>
    
  )
}

export default Wishlist