import {Container, Divider, Typography, Box} from '@mui/material'
// import { Stack, Container, IconButton, Grid, Card, CardActionArea, CardMedia, CardContent, Typography, ImageList, ImageListItem, ImageListItemBar, ListSubheader } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

const Cart = ({user, cartItems, cartCount, addItemToCart, removeItemFromCart, clearItemFromCart, setNewQuantityForCartItem}) => {


    return (
        <Container maxWidth="md">
        <Typography variant="h4" component="h4" gutterBottom>
            Shopping Cart
        </Typography>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price Per Unit&nbsp;(AUD)</TableCell>
                    <TableCell align="right">Amount&nbsp;(AUD)</TableCell>
                    <TableCell align="right">Remove Item</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {cartItems.map(item => {
                    const {id, name, description, image, amount, currency, quantity} = item 
                    console.log(item)
                    return (
                        <TableRow
                        key={id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {name}
                        </TableCell>
                        <TableCell align="right">{quantity}</TableCell>
                        <TableCell align="right">{currency} {amount}</TableCell>
                        <TableCell align="right">{quantity * amount / 100}</TableCell>
                        <TableCell align="right">{'bin icon'}</TableCell>
                        </TableRow>
                    )})
                }
                </TableBody>
            </Table>
            </TableContainer>
        </Container>
    );

//   return (
//     <Container maxWidth="sm">
//       <Typography variant="h4" component="h4" gutterBottom>
//         Shopping Cart
//       </Typography>
//       <Box>
//         {/* <Grid container rowSpacing={1} > */}
//                     {cartItems
//                         .map(item => {
//                             const {id, name, description, image, amount, currency} = item 
//                             // console.log('item', item)
//                             return (
//                                 <TableContainer component={Paper}>
//                                     <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                                         <TableHead>
//                                         <TableRow>
//                                             <TableCell>Dessert (100g serving)</TableCell>
//                                             <TableCell align="right">Calories</TableCell>
//                                             <TableCell align="right">Fat&nbsp;(g)</TableCell>
//                                             <TableCell align="right">Carbs&nbsp;(g)</TableCell>
//                                             <TableCell align="right">Protein&nbsp;(g)</TableCell>
//                                         </TableRow>
//                                         </TableHead>
//                                         <TableBody>
//                                         {rows.map((row) => (
//                                             <TableRow
//                                             key={row.name}
//                                             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                                             >
//                                             <TableCell component="th" scope="row">
//                                                 {row.name}
//                                             </TableCell>
//                                             <TableCell align="right">{row.calories}</TableCell>
//                                             <TableCell align="right">{row.fat}</TableCell>
//                                             <TableCell align="right">{row.carbs}</TableCell>
//                                             <TableCell align="right">{row.protein}</TableCell>
//                                             </TableRow>
//                                         ))}
//                                         </TableBody>
//                                     </Table>
//                                     </TableContainer>
//                                 // <Grid item xs={6} sm={4} md={3} key={`${name}-${id}`}>
//                                 //     <Card sx={{ maxWidth: 345, position: 'relative' }}>
//                                 //         <CardContent>
//                                 //             {/* <Typography gutterBottom variant="h8" component="div" sx={{position:'absolute', top: 0, left:0, right:0, marginRight: 0, marginLeft: 'auto', zIndex: 10, background: 'rgba(255,255,255,0)'}}> */}
//                                 //             {/* <Stack direction="row" sx={{position:'absolute', top: 0, left:0, right:0, marginRight: 0, marginLeft: 'auto', zIndex: 10, background: 'rgba(255,255,255,0)'}}> */}
//                                 //             <Stack direction="row-reverse" sx={{background: 'rgba(255,255,255,0)'}}>
//                                 //                 <IconButton onClick={e => handleClickCart(e, id)} aria-label={`add product id ${id} to cart`}>
//                                 //                     <AddShoppingCartIcon id={`cart-${id}`} role='button' aria-label={`add product id ${id} to cart`} />
//                                 //                 </IconButton>
//                                 //                 <IconButton onClick={e => handleClickFave(e, id)} aria-label={`add product id ${id} to wishlist`}>
//                                 //                     {/* <FavoriteIcon id={`fav-${id}`} role='button' sx={{ color: 'rgb(255,20,147)'}} aria-label={`add product id ${id} to wishlist`}/> */}
//                                 //                     <FavoriteIcon id={`fav-${id}`} role='button' sx={{ color: isFaveFound(id) ? 'rgb(255,20,147)' : 'rgb(0,0,0, 0.35)'}} aria-label={`add product id ${id} to wishlist`}/>
//                                 //                 </IconButton>
//                                 //             </Stack>
//                                 //             {/* </Typography> */}
//                                 //         </CardContent>
//                                 //         <CardActionArea onClick={handleClickNavigate}>
//                                 //             <CardMedia
//                                 //             id={id}
//                                 //             component="img"
//                                 //             height="140"
//                                 //             width="205"
//                                 //             image={image}
//                                 //             alt={name}
//                                 //             />
//                                 //         </CardActionArea>
//                                 //         <CardContent>
//                                 //             <Typography gutterBottom variant="h8" component="div" sx={{fontWeight: 'small'}}>
//                                 //                 {`${name}  |  ${currency}${amount}`}
//                                 //             </Typography>
//                                 //             <Typography variant="body2" color="text.secondary">
//                                 //                 {description}
//                                 //             </Typography>
//                                 //         </CardContent>
//                                 //     </Card>
                                    
//                                 // </Grid>
//                             )
//                         })
//                     }
//                 {/* </Grid> */}
                
//         </Box>
//         <Divider sx={{}}></Divider>
//         <Box>

//         </Box>
//     </Container>
//   )
}

export default Cart