import React, { useState, useEffect } from 'react'
// import data from '../../data/data.json'
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
const Home = ({data}) => {
    const [currentCategory, setCurrentCategory] = useState(initialCategory)
    const navigate = useNavigate()
    const handleClick = (e) => {
        console.log('click', e.target)
        const [newCategory, newSubcategory] = e.target.name.split('-')
        const newCurrentCategory = {...currentCategory, ...{category: newCategory, subcategory: newSubcategory}}
        console.log('newCurrentCategory', newCurrentCategory)
        setCurrentCategory(newCurrentCategory)
        navigate(`${newCurrentCategory.category}/${newCurrentCategory.subcategory}`)
    }
    console.log(data)
    const category = data.categories
    console.log(Object.keys(data.categories))
    console.log(currentCategory)
    // if(isLoading || data.length === 0) return <p>Loading...</p>
    return (
        <Container>
            {
                Object.keys(data.categories).map(category => <Category key={category} category={category} handleClick={handleClick} subcategories={data.categories[category]} />)
            }
        </Container>
    )
    
}

export default Home