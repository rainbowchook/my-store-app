import {useParams, useNavigate} from 'react-router-dom'
// import data from '../../data/data.json'
import { Stack, Container, IconButton, Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const SubCategory = ({data, favourites, addItemToCart, isFaveFound, addToFavourites, removeFromFavourites}) => {
    const {category, subcategory} = useParams()
    const navigate = useNavigate()
    console.log(favourites)
    
    // const handleClick = (e, ...rest) => {
    //     console.log(e.target)
    //     console.log(e.target.id)
    //     const [ id ] = rest
    //     console.log(id)
    //     if(!id) {
    //         navigate(`/${category}/${subcategory}/${e.target.id}`)
    //     } else if (e.target.id === `cart-${id}`) {
    //         console.log('added to cart', id)
    //         addItemToCart(id)
    //     } else {
    //         isFaveFound(id) ? removeFromFavourites(id) : addToFavourites(id)
    //     }
    // }

    const handleClickNavigate = (e) => {
        navigate(`/${category}/${subcategory}/${e.target.id}`)
    }

    // const handleClickCart = (e, id) => {
    //     console.log(e.target)
    //     console.log(e.target.id)
    //     console.log('added to cart', id)
    //     addItemToCart(id)
    // }

    // const handleClickFave = (e, id) => {
    //     console.log(e.target)
    //     console.log(e.target.id)
    //     isFaveFound(id) ? removeFromFavourites(id) : addToFavourites(id)
    // }

    const handleClickCart = (id) => {
        console.log('added to cart', id)
        addItemToCart(id)
    }

    const handleClickFave = (id) => {
        isFaveFound(id) ? removeFromFavourites(id) : addToFavourites(id)
    }

    return (
        <Container sx={{ marginTop: 3, marginBottom: 10}}>
            <Typography variant="h8" component="h4" gutterBottom>
                <span onClick={() => navigate('/')} role='link'>{category.toUpperCase()}</span>
                {'  >  '}
                <span onClick={() => navigate(`/${category}/${subcategory}`)} role='link'>{subcategory.toUpperCase()}</span>
            </Typography>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                {data.products[category]
                    .filter(item => item.subcategory === subcategory)
                    .map(item => {
                        const {id, name, description, image, amount, currency} = item 
                        // console.log('item', item)
                        return (
                            <Grid item xs={6} sm={4} md={3} key={`${name}-${id}`}>
                                <Card sx={{ maxWidth: 345, maxHeight: 320, overflowY: 'scroll', position: 'relative' }}>
                                    <CardContent>
                                        {/* <Typography gutterBottom variant="h8" component="div" sx={{position:'absolute', top: 0, left:0, right:0, marginRight: 0, marginLeft: 'auto', zIndex: 10, background: 'rgba(255,255,255,0)'}}> */}
                                        {/* <Stack direction="row" sx={{position:'absolute', top: 0, left:0, right:0, marginRight: 0, marginLeft: 'auto', zIndex: 10, background: 'rgba(255,255,255,0)'}}> */}
                                        <Stack direction="row-reverse" sx={{background: 'rgba(255,255,255,0)'}}>
                                            <IconButton onClick={() => handleClickCart(id)} aria-label={`add product id ${id} to cart`}>
                                                <AddShoppingCartIcon id={`cart-${id}`} role='button' aria-label={`add product id ${id} to cart`} />
                                            </IconButton>
                                            <IconButton onClick={() => handleClickFave(id)} aria-label={`add product id ${id} to wishlist`}>
                                                {/* <FavoriteIcon id={`fav-${id}`} role='button' sx={{ color: 'rgb(255,20,147)'}} aria-label={`add product id ${id} to wishlist`}/> */}
                                                <FavoriteIcon id={`fav-${id}`} role='button' sx={{ color: isFaveFound(id) ? 'rgb(255,20,147)' : 'rgb(0,0,0, 0.35)'}} aria-label={`add product id ${id} to wishlist`}/>
                                            </IconButton>
                                        </Stack>
                                        {/* </Typography> */}
                                    </CardContent>
                                    <CardActionArea onClick={handleClickNavigate}>
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
        </Container>
        
      )
}

export default SubCategory