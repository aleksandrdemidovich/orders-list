import React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import {useDispatch, useSelector} from "react-redux";
import {addItemToCart, calculateTotalPrice, ItemType} from "../redux/cart-reducer";
import {AppStateType} from "../redux/store";



type ProductCardPropsType = {
    product: ItemType
}

function ProductCard(props: ProductCardPropsType) {

    const cartItems = useSelector<AppStateType, Array<ItemType>>(state => state.cart.items)

    const dispatch = useDispatch()

    const addItemToCartHandler = () => {
        dispatch(addItemToCart({item: props.product}))
        dispatch(calculateTotalPrice())
        localStorage.setItem(props.product.id.toString(), JSON.stringify(props.product))
    }

    const isContainsInCart = (): boolean => {
       return cartItems.map((i: ItemType) => i.id).includes(props.product.id)
    }

    return (
        <Card sx={{ maxWidth: 345, marginBottom:'25px' }}>
            <CardMedia
                component="img"
                alt="item"
                height="240"
                image={props.product.img}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.product.description}
                </Typography>

            </CardContent>
            <CardActions style={{justifyContent:'space-between'}}>
                <Typography variant="h6">
                    {props.product.pricePerOne}$
                </Typography>
                {!isContainsInCart() ?
                    <Button size="small" onClick={addItemToCartHandler}>Add to cart</Button>
                    : <p style={{display:'flex', alignItems:'center'}}>
                        <DoneIcon color={"success"}/> already added to cart
                    </p>}
            </CardActions>
        </Card>
    );
}

export default ProductCard;
