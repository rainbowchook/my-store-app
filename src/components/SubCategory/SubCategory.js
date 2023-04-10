import {useParams} from 'react-router-dom'
// import data from '../../data/data.json'
import { Stack, ImageList, ImageListItem, ImageListItemBar } from '@mui/material'

const SubCategory = ({data}) => {
    const {category, subcategory} = useParams()
    return (
        <>
            <h4>{`${category.toUpperCase()} > ${subcategory.toUpperCase()}`}</h4>
            <ImageList sx={{ width: 500, height: 450, minWidth: 0.7, marginX: 'auto', marginY: 3, maxHeight: 0.7}} cols={3} rowHeight={164}>
                {data.products[category]
                    .filter(item => item.subcategory === subcategory)
                    .map(item => {
                        const {id, name, description, image, amount, currency, subcategory} = item 
                        console.log('item', item)
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
                                        id={id}
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
        </>
        
      )
}

export default SubCategory