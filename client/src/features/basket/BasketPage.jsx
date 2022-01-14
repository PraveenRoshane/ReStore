import { Box, Button, Grid, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Add, Delete, Remove } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import BasketSummary from './BasketSummary';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/store/configerStore';
import { addBasketItemAsync, removeBasketItemAsync } from "../basket/basketSlice";


export default function BasketPage() {
    const { basket, status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();   

    if (!basket) return <Typography variant='h3'>Your basket is empty</Typography>

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Price(Rs.)</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">Subtotal(Rs.)</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basket.items.map(row => (
                            <TableRow
                                key={row.productId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Box display='flex'>
                                        <img src={row.pictureUrl} alt={row.name} style={{ height: 50, marginRight: 20 }} />
                                        <span>{row.name}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">{(row.price / 100).toFixed(2)}</TableCell>
                                <TableCell align="center">
                                    <LoadingButton
                                        loading={status.includes('pendingRemoveItem' + row.productId + 'rem')}
                                        onClick={() => dispatch(removeBasketItemAsync({productId: row.productId, quantity: 1, name: 'rem' }))}>
                                        <Remove />
                                    </LoadingButton>
                                    {row.quantity}
                                    <LoadingButton
                                        loading={status === 'pendingAddItem' + row.productId}
                                        onClick={() => dispatch(addBasketItemAsync({productId: row.productId}))}>
                                        <Add />
                                    </LoadingButton>
                                </TableCell>
                                <TableCell align="right">{(row.price * row.quantity / 100).toFixed(2)}</TableCell>
                                <TableCell align="right">
                                    <LoadingButton
                                        loading={status.includes('pendingRemoveItem' + row.productId + 'del')}
                                        onClick={() => dispatch(removeBasketItemAsync({productId: row.productId, quantity: row.quantity, name: 'del'}))}>
                                        <Delete />
                                    </LoadingButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6}>
                    <BasketSummary />
                    <Button
                        component={Link}
                        to='/checkout'
                        variant='contained'
                        size='large'
                        fullWidth
                    >
                        Checkout
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}