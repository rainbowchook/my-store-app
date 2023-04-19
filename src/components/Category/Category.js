import React from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const Category = ({ category, handleClick, subcategories }) => {
    const navigate = useNavigate()

    return (
        <Container sx={{ marginTop: 3, marginBottom: 10}}>
            <Typography variant="h8" component="h4" gutterBottom>
                <span onClick={() => navigate('/')} role='link'>{category.toUpperCase()}</span>
            </Typography>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                {
                    subcategories.map( subcat => {
                        const {id, name, description, image, subcategory} = subcat
                        return (
                            <Grid item xs={6} sm={4} md={3} key={`${name}-${id}`}>
                                <Card key={id} sx={{ maxWidth: 345, maxHeight: 200, overflowY: 'scroll'}}>
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
        </Container>
    )
}

export default Category