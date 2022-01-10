import { Box, Button, Grid, Typography } from '@mui/material';
import { useState } from 'react'
import agent from '../../app/api/agent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Add, Delete, Remove } from '@mui/icons-material';
import { useStoreContext } from '../../app/context/StoreContext';
import { LoadingButton } from '@mui/lab';
import BasketSummary from './BasketSummary';
import { Link } from 'react-router-dom';


export default function BasketPage() {
    const { basket, setBasket, removeItem } = useStoreContext();
    const [status, setStatus] = useState({
        loading: false,
        name: ''
    })

    function handleAddItem(productId, name) {
        setStatus({ loading: true, name: name });
        agent.basket.addItem(productId)
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, name: '' }))
    }

    function handleRemoveItem(productId, quantity, name) {
        setStatus({ loading: true, name: name });
        agent.basket.removeItem(productId, quantity)
            .then(() => removeItem(productId, quantity))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, name: '' }))
    }

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
                                        loading={status.loading && status.name === 'rem' + row.productId}
                                        onClick={() => handleRemoveItem(row.productId, 1, 'rem' + row.productId)}>
                                        <Remove />
                                    </LoadingButton>
                                    {row.quantity}
                                    <LoadingButton
                                        loading={status.loading && status.name === 'add' + row.productId}
                                        onClick={() => handleAddItem(row.productId, 'add' + row.productId)}>
                                        <Add />
                                    </LoadingButton>
                                </TableCell>
                                <TableCell align="right">{(row.price * row.quantity / 100).toFixed(2)}</TableCell>
                                <TableCell align="right">
                                    <LoadingButton
                                        loading={status.loading && status.name === 'del' + row.productId}
                                        onClick={() => handleRemoveItem(row.productId, row.quantity, 'del' + row.productId)} color='error'>
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