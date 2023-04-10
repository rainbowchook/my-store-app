import React from 'react'
import data from '../../data/data.json'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'

const SubCategory = ({category, subcategory}) => {
    return (
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            {data.products[category].map(item => {
                const {id, name, description, image, amount, currency, subcategory} = item 
                return (
                    <>
                        <ImageListItem key={id}>
                            <img
                                // src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                src={image}
                                srcSet={`${image} 2x`}
                                alt={name}
                                loading="lazy"
                            />
                        </ImageListItem>
                        <ImageListItemBar>
                            title={`${name} | ${subcategory} | ${currency}${amount}`}
                            subtitle={<span>{description}</span>}
                            position="below"
                        </ImageListItemBar>
                    </>
                )
            })}
        </ImageList>
      )
}

export default SubCategory