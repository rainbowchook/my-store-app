import React from 'react'
import { Stack, Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material'
import data from '../../data/data.json'
const Category = ({ category, handleClick }) => {

    return (
        <>
            <h2>{category.toUpperCase()}</h2>
            <Stack direction={'row'}>
                
                {
                    data.categories[category].map( cat => {
                        const {id, name, description, image, subcategory} = cat
                        return (
                            <Card key={id} sx={{ maxWidth: 345 }}>
                                <CardActionArea onClick={handleClick}>
                                    <CardMedia
                                    id={subcategory}
                                    component="img"
                                    height="140"
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