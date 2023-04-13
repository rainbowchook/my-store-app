import React from 'react'
import { Stack, Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material'
const Category = ({ category, handleClick, subcategories }) => {
    // console.log(category, handleClick, subcategories)
    return (
        <>
            <h4>{category.toUpperCase()}</h4>
            <Stack direction={'row'}>
                {
                    subcategories.map( subcat => {
                        const {id, name, description, image, subcategory} = subcat
                        return (
                            <Card key={id} sx={{ maxWidth: 345 }}>
                                <CardActionArea onClick={handleClick}>
                                    <CardMedia
                                    id={`${category}-${subcategory}`}
                                    component="img"
                                    height="140"
                                    width="205"
                                    image={image}
                                    alt={name}
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {subcategory}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {description}
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        )  
                    })
                }
            </Stack>
        </>
    )
}

export default Category