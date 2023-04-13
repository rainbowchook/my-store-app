import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {Container, Divider, Typography, Box, IconButton, Button} from '@mui/material'
// import { Stack, Container, IconButton, Grid, Card, CardActionArea, CardMedia, CardContent, Typography, ImageList, ImageListItem, ImageListItemBar, ListSubheader } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import QuantitySelect from '../QuantitySelect/QuantitySelect';
import { styled } from '@mui/material/styles'
import { parseIntToDollarsAndCents, calculateCartSubtotal } from '../../utils/utilities'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

//   const StyledButton = styled(Button) (({ theme }) => ({
//     '&:last-child div': {
//         marginRight: 2, 
//         marginLeft: 'auto', 
//         paddingY: 2
//     },
    
//     backgroundColor: theme.palette.common.black,
//       color: theme.palette.common.white,
//   }));

const Cart = ({user, cartItems, cartCount, addItemToCart, removeItemFromCart, clearItemFromCart, setNewQuantityForCartItem}) => {
    const [subtotal, setSubtotal] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        const newSubtotal = calculateCartSubtotal(cartItems)
        setSubtotal(newSubtotal)
    }, [cartItems])

    const handleClick = e => {
        const {id} = e.target
        if(id === 'checkout-cart')  {
            console.log('inside handleClick for Cart - checkout cart')
        }
        if(id === 'continue-shopping') {
            console.log('inside handleClick for Cart - continue shopping')
            navigate('/')
        }
    }

    const handleAddOneItem = (id, quantity, quantityInStock) => {
        if(quantity >= quantityInStock) return
        addItemToCart(id)
    }

    const handleRemoveOneItem = (id, quantity) => {
        if(quantity <= 0) return
        removeItemFromCart(id)
    }

    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="h4" gutterBottom>
                {user && `${user.displayName}'s`}
                {' '}
                Shopping Cart
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="shopping cart table">
                    <TableHead>
                    <StyledTableRow>
                        <StyledTableCell>Product Name</StyledTableCell>
                        <StyledTableCell align="center">Quantity</StyledTableCell>
                        <StyledTableCell align="center">Price&nbsp;(AUD)</StyledTableCell>
                        <StyledTableCell align="center">Subtotal&nbsp;(AUD)</StyledTableCell>
                        <StyledTableCell align="center">Remove Item</StyledTableCell>
                    </StyledTableRow>
                    </TableHead>
                    <TableBody>
                    {cartItems.map(item => {
                        const {id, name, description, image, amount, currency, quantity, quantityInStock} = item 
                        console.log(item)
                        return (
                            <StyledTableRow
                            key={id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row">
                                    {name}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Stack direction="row">
                                        <IconButton onClick={() => handleRemoveOneItem(id, quantity)} aria-label={`add product id ${id} to cart`}>
                                            <ChevronLeftIcon id={`cart-${id}-remove`} />
                                        </IconButton>
                                        <QuantitySelect {...{ id, quantity, setNewQuantityForCartItem, quantityInStock }} />
                                        {/* {quantity}  */}
                                        <IconButton disabled={quantity === quantityInStock ? true : false} onClick={() => handleAddOneItem(id, quantity, quantityInStock)} aria-label={`add product id ${id} to cart`}>
                                            <ChevronRightIcon id={`cart-${id}-add`} />
                                        </IconButton>
                                    </Stack>
                                </StyledTableCell>
                                <StyledTableCell align="center">{parseIntToDollarsAndCents(amount)}</StyledTableCell>
                                <StyledTableCell align="center">{parseIntToDollarsAndCents(quantity * amount)}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <IconButton onClick={() => clearItemFromCart(id)} aria-label={`add product id ${id} to cart`}>
                                      <DeleteOutlineIcon id={`cart-${id}-clear`} />
                                    </IconButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        )})
                    }
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <Divider /> */}
            <Stack direction="row">
                <Container sx={{ mt: 2, mb: 2}} maxWidth="sm">
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" component="h6" gutterBottom>
                            ORDER SUMMARY | {cartCount} ITEM(S)
                        </Typography>
                        <Stack direction="row" sx={{mb: 3, mt: 2}}>
                            <Stack direction="row" sx={{width: 'fitContent', marginLeft: 10}}>
                                <Typography variant="string">
                                    Item(s) subtotal 
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={2} sx={{marginRight: 10, marginLeft: 'auto'}}>
                                <Typography variant="string">
                                    AUD {parseIntToDollarsAndCents(subtotal)}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack direction="row">
                            <Stack direction="row" sx={{width: 'fitContent', marginLeft: 10}}>
                                <Typography variant="h6" component="h6" gutterBottom>
                                    SUBTOTAL 
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={2} sx={{marginRight: 10, marginLeft: 'auto'}}>
                                <Typography variant="h6" component="h6" gutterBottom>
                                    AUD {parseIntToDollarsAndCents(subtotal)}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack direction="row">
                            <Stack direction="row" sx={{width: 'fitContent', marginLeft: 10}}>
                                <Typography variant="h6" component="h6" gutterBottom>
                                    ORDER TOTAL
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={2} sx={{marginRight: 10, marginLeft: 'auto'}}>
                                <Typography variant="h6" component="h6" gutterBottom>
                                    AUD {parseIntToDollarsAndCents(subtotal)}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Paper>
                </Container>
                <Divider></Divider>
                <Stack sx={{ mt: 2, mb: 2, justifyContent: 'center'}} maxWidth="sm">
                    <Button 
                        variant='contained' 
                        sx={{mb: 2}} 
                        id='checkout-cart' 
                        onClick={handleClick}
                        aria-label='checkout cart'
                    >
                        Checkout
                    </Button>
                    <Button 
                        variant='outlined' 
                        sx={{mb: 2}} 
                        id='continue-shopping' 
                        onClick={handleClick}
                        aria-label='continue shopping'
                    >
                        Continue Shopping
                    </Button>
                </Stack>
            </Stack>
        </Container>
    );

}

export default Cart