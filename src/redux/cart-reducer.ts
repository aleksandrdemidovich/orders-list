import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type ItemType = {
    img: string
    name: string
    description: string
    pricePerOne: number
    id: string
    totalPrice?: number
    count?: number
}
type InitialStateType = {
    items: Array<ItemType>
    totalCartPrice: number
}


export const slice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalCartPrice: 0
    } as InitialStateType,
    reducers: {
        addItemToCart(state, action: PayloadAction<{ item: ItemType }>){
            return {...state, items: [...state.items, {...action.payload.item, count: 1, totalPrice: action.payload.item.pricePerOne}]}
        },
        removeItemFromCart(state, action: PayloadAction<{ itemId: string }>){
            return {...state, items: state.items.filter(i => i.id !== action.payload.itemId)}
        },
        calculateTotalPrice(state){
            return {...state, totalCartPrice: state.items.map(i => i.totalPrice!).reduce((previousValue, currentValue) => previousValue + currentValue)}
        },
        increaseItemCount(state, action: PayloadAction<{ itemId: string }>){
            return {...state, items: state.items.map(i => i.id === action.payload.itemId ? {...i, count: i.count! + 1} : i)}
        },
        decreaseItemCount(state, action: PayloadAction<{ itemId: string }>){
            return {...state, items: state.items.map(i => i.id === action.payload.itemId ? {...i, count: i.count! - 1} : i)}
        },
        changeTotalPriceItemCount(state, action: PayloadAction<{ itemId: string }>){
            return {...state, items: state.items.map(i => i.id === action.payload.itemId ? {...i, totalPrice: i.pricePerOne * i.count!} : i)}
        },
    },
})

export const cartReducer = slice.reducer
export const {addItemToCart, removeItemFromCart, calculateTotalPrice,
    changeTotalPriceItemCount, decreaseItemCount, increaseItemCount} = slice.actions



