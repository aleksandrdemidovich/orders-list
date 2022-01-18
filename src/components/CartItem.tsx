import React from 'react';
import {Button, CardMedia, Paper, styled} from "@mui/material";
import {useDispatch} from "react-redux";
import {
    changeTotalPriceItemCount,
    decreaseItemCount,
    increaseItemCount, ItemType,
    removeItemFromCart
} from "../redux/cart-reducer";



type CartItemPropsType = {
    item: ItemType
}

function CartItem(props: CartItemPropsType) {

    const dispatch = useDispatch()

    const increaseItemCountHandler = (item: ItemType) => {
        dispatch(increaseItemCount({itemId: item.id}))
        dispatch(changeTotalPriceItemCount({itemId: item.id}))
    }
    const decreaseItemCountHandler = (item: ItemType) => {
        if(item.count === 1){
            dispatch(removeItemFromCart({itemId: item.id}))
            localStorage.removeItem(item.id.toString())
        }
        dispatch(decreaseItemCount({itemId: item.id}))
        dispatch(changeTotalPriceItemCount({itemId: item.id}))
    }

    return (
        <ItemContainer elevation={10}>
            <CardMedia
                component="img"
                alt="item"
                height="240"
                image={props.item.img}
                style={{width:'30%'}}
            />
            <ItemInformationContainer>
                <h2 style={{margin:'10px 0 10px 0', color:'#0288d1'}}>{props.item.name}</h2>
                <h5 style={{margin: 0}}>{props.item.description}</h5>
                <h6 style={{margin:'10px 0 10px 0', color:'gray'}}>Piece price : {props.item.pricePerOne}$</h6>
            </ItemInformationContainer>
            <IncrementItemCountContainer>
                <Button variant={"outlined"}
                        color={"error"}
                        size={"small"}
                        style={{marginRight:'10px'}}
                        onClick={() => decreaseItemCountHandler(props.item)}
                >-</Button>
                <h2>{props.item.count}</h2>
                <Button variant={"outlined"}
                        color={"success"}
                        size={"small"}
                        style={{marginLeft:'10px'}}
                        onClick={() => increaseItemCountHandler(props.item)}
                >+</Button>
            </IncrementItemCountContainer>
        </ItemContainer>
    );
}

export default CartItem;

const ItemContainer = styled(Paper)`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-bottom: 15px;
  padding-right: 20px;
  align-items: center;
`
const ItemInformationContainer = styled("div")`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  width: 50%;
  margin-left: 25px;
`
const IncrementItemCountContainer = styled("div")`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
`

