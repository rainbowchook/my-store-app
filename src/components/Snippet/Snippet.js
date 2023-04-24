import React from 'react'
import { useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const Snippet = ({item}) => {
    const navigate = useNavigate()
    const {id, name, description, image, amount, currency, category, subcategory} = item 
  return (
    <Grid item xs={6} sm={4} key={`${name}-${id}-${Date.now()}`}>
        {/* <Card sx={{ maxWidth: 345, height: 140, overflowY: 'scroll', position: 'relative' }}> */}
        <Card sx={{ maxWidth: 345, height: 140, position: 'relative' }}>
            <CardActionArea onClick={() => navigate(`/${category}/${subcategory}/${id}`)}>
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
}

export default Snippet