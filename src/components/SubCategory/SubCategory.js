import {useParams, useNavigate} from 'react-router-dom'
// import data from '../../data/data.json'
import { Stack, Container, IconButton, Grid, Card, CardActionArea, CardMedia, CardContent, Typography, ImageList, ImageListItem, ImageListItemBar, ListSubheader } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const SubCategory = ({data, addToCart, addToFavourites}) => {
    const {category, subcategory} = useParams()
    const navigate = useNavigate()
    const handleClick = (e) => {
        console.log(e.target)
        navigate(`/${category}/${subcategory}/${e.target.id}`)
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
                                <Card sx={{ maxWidth: 345, position: 'relative' }}>
                                    <CardContent>
                                        {/* <Typography gutterBottom variant="h8" component="div" sx={{position:'absolute', top: 0, left:0, right:0, marginRight: 0, marginLeft: 'auto', zIndex: 10, background: 'rgba(255,255,255,0)'}}> */}
                                        {/* <Stack direction="row" sx={{position:'absolute', top: 0, left:0, right:0, marginRight: 0, marginLeft: 'auto', zIndex: 10, background: 'rgba(255,255,255,0)'}}> */}
                                        <Stack direction="row-reverse" sx={{zIndex: 10, background: 'rgba(255,255,255,0)'}}>
                                        {/* <FavoriteIcon onClick={addToFavourites} id={id} role='button' sx={{ color: '#FF1493' }} aria-label={`add product id ${id} to wishlist`}/> */}
                                            <IconButton onClick={addToCart} id={id} aria-label={`add product id ${id} to cart`}>
                                                <AddShoppingCartIcon id={id} role='button' aria-label={`add product id ${id} to cart`} />
                                            </IconButton>
                                            <IconButton onClick={addToFavourites} id={id} aria-label={`add product id ${id} to wishlist`}>
                                                <FavoriteIcon id={id} role='button' sx={{ color: '#FF1493' }} aria-label={`add product id ${id} to wishlist`}/>
                                            </IconButton>
                                        </Stack>
                                        {/* </Typography> */}
                                    </CardContent>
                                    <CardActionArea onClick={handleClick}>
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