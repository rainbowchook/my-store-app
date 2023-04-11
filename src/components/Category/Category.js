import React from 'react'
import {useNavigate} from 'react-router-dom'
import { Stack, Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material'
const Category = ({ category, handleClick, subcategories }) => {
    const navigate = useNavigate()

    // console.log(category, handleClick, subcategories)
    return (
        <>
            <h4 onClick={() => navigate('/')}>{category.toUpperCase()}</h4>
            {/* <Stack direction='row' sx={{width: 0.9, overflowX: 'scroll', marginX: 'auto',flexShrink: 0}}> */}
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                {
                    subcategories.map( subcat => {
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
            </Grid>
            {/* </Stack> */}
        </>
    )
}

export default Category