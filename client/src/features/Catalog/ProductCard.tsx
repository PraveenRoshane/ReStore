import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: 'purple'}}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps={{
                    sx: {fontWeight: 'bold'},
                    color: 'primary.main'
                }}
            />
            <CardMedia                
                component="img"                
                sx={{backgroundSize: 'contain', bgcolor: 'lightblue'}}
                image={product.pictureUrl}
                alt={product.name}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom color='secondary' variant="h5" component="div">
                    $ {(product.price/100).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand}/{product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    )
}
