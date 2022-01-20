import React from 'react';
import {Badge, BadgeProps, Button, Card, CardActions, CardContent, CardMedia, styled, Typography} from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import {useDispatch, useSelector} from "react-redux";
import {addItemToCart, calculateTotalPrice, ItemType} from "../redux/cart-reducer";
import {AppStateType} from "../redux/store";


type ProductCardPropsType = {
    product: ItemType
}

function ProductCard(props: ProductCardPropsType) {

    const cartItems = useSelector<AppStateType, Array<ItemType>>(state => state.cart.items)
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn);

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
        <Card style={{display:'flex', flexDirection:'column', justifyContent:'space-between'}} sx={{maxWidth: 345, marginBottom: '25px'}}>
            <CardMedia
                component="img"
                alt="item"
                height="240"
                image={props.product.img}
            />
            <StyledBadge badgeContent={props.product.pricePerOne + '$'} color={"success"}
                         anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <CardContent style={{marginTop:'15px'}}>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.product.description}
                    </Typography>
                </CardContent>
            </StyledBadge>
            {isLoggedIn && <CardActions style={{justifyContent: 'center'}}>
                {!isContainsInCart() ?
                    <Button size="small" variant={"contained"} fullWidth onClick={addItemToCartHandler}>Add to cart</Button>
                    : <p style={{display: 'flex', alignItems: 'center', margin:0}}>
                        <DoneIcon color={"success"}/> already added to cart
                    </p>}
            </CardActions>}
        </Card>
    );
}

export default ProductCard;

const StyledBadge = styled(Badge)<BadgeProps>(({theme}) => ({
    '& .MuiBadge-badge': {
        right: 40,
        top: 15,
        padding: '0 4px',
        font: 'italic 1.2em "Fira Sans", serif'
    },
}));
