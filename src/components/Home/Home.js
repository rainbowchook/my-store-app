import React, { useState, useLayoutEffect } from 'react'
import Container from '@mui/material/Container'
import { useNavigate } from "react-router-dom";
import Category from '../Category/Category'

const initialCategory = {
    category: 'womens',
    subcategory: 'hats'
}
const Home = ({data}) => {
    const [currentCategory, setCurrentCategory] = useState(initialCategory)
    const navigate = useNavigate()
    useLayoutEffect(() => {
        window.scrollTo(0,0)   
    }, [])
    const handleClick = (e) => {
        const [newCategory, newSubcategory] = e.target.name.split('-')
        const newCurrentCategory = {...currentCategory, ...{category: newCategory, subcategory: newSubcategory}}
        setCurrentCategory(newCurrentCategory)
        navigate(`${newCurrentCategory.category}/${newCurrentCategory.subcategory}`)
    }
    return (
        <Container>
            {
                Object.keys(data.categories).map(category => <Category key={category} category={category} handleClick={handleClick} subcategories={data.categories[category]} />)
            }
        </Container>
    )
    
}

export default Home