import React, { useState } from 'react'
import data from '../../data/data.json'
// import ImageList from '@mui/material/ImageList'
// import ImageListItem from '@mui/material/ImageListItem'
// import ImageListItemBar from '@mui/material/ImageListItemBar'
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import CardActionArea from '@mui/material/CardActionArea';
import Container from '@mui/material/Container'
// import Button from '@mui/material/Button'
// import Stack from '@mui/material/Stack'
import { useNavigate } from "react-router-dom";
import Category from '../Category/Category'

const initialCategory = {
    category: 'womens',
    subcategory: 'hats'
}
const Home = () => {
    const [currentCategory, setCurrentCategory] = useState(initialCategory)

    const navigate = useNavigate()
    const handleClick = (e) => {
        console.log('click', e.target)
        const newCurrentCategory = {...currentCategory, ...{subCategory: e.target.id}}
        console.log(newCurrentCategory)
        setCurrentCategory(newCurrentCategory)
        navigate(`${newCurrentCategory.category}/${newCurrentCategory.subCategory}`)
    }
    console.log(data)
    const category = data.categories
    console.log(Object.keys(data.categories))
    console.log(currentCategory)
    return (
        <Container>
            {
                Object.keys(data.categories).map(category => <Category key={category} {...{category, handleClick}} />)
            }
        </Container>
    )
    
}

export default Home