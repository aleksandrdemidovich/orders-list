import {Container, Paper, styled} from '@mui/material';
import React, {useEffect} from 'react';
import CartItem from "../../components/CartItem";
import OrderForm from "../../components/OrderForm";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {addItemToCart, calculateTotalPrice, ItemType} from "../../redux/cart-reducer";


function CartPage() {

    const cartItems = useSelector<AppStateType, Array<ItemType>>(state => state.cart.items)
    const totalCartPrice = useSelector<AppStateType, number>(state => state.cart.totalCartPrice)

    const dispatch = useDispatch()

    let arr: Array<ItemType> = []

    for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            let item = JSON.parse( localStorage.getItem(key) as string );
            arr.push(item)
        }
    }

    const productsInCart = cartItems.map(p => {
        return <CartItem key={p.description} item={p}/>
    })

    useEffect(() => {
        if (!cartItems.length) {
            arr.map((item) => dispatch(addItemToCart({item})))
        }
    }, [dispatch])

    useEffect(() => {
        if (cartItems.length) {
            dispatch(calculateTotalPrice())
        }
    }, [cartItems, dispatch])


    return (
        <div className="App">
            <Container maxWidth="xl">
                <h1 style={{marginBottom: '10px'}}>Order list</h1>
                <h5 style={{color: 'gray', margin: 0}}>{cartItems.length} item worth: {totalCartPrice} $</h5>
                <RootContainer>
                    <CartItemsContainer>
                        {cartItems.length || arr.length ? productsInCart : <h1 style={{margin:'20% auto', color:'gray'}}>Cart is empty</h1>}
                    </CartItemsContainer>
                    <OrderBlockContainer elevation={8}>
                        <h3>Contacts for ordering</h3>
                        <OrderForm/>
                    </OrderBlockContainer>
                </RootContainer>
            </Container>
        </div>
    );
}

export default CartPage;


const RootContainer = styled("div")`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-top: 20px;
  justify-content: space-between;
`
const CartItemsContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 65%;
  height: 65vh;
  padding: 10px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: gray;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #42a5f5;
    border-radius: 20px;
  }
`
const OrderBlockContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 30%;
  align-items: center;
  height: min-content;
`
