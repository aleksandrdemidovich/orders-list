import {ItemType} from "./cart-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type ContactsType = {
    name: string
    surName: string
    address: string
    phone: string
}
type InitialStateType = {
    contacts: ContactsType | null
    orderList: Array<ItemType> | null
    totalPrice: number | null
}

export const slice = createSlice({
    name: 'order',
    initialState: {
        contacts: null,
        orderList: null,
        totalPrice: null
    } as InitialStateType,
    reducers: {
        setOrderList(state, action: PayloadAction<{ orderList: Array<ItemType>, contacts: ContactsType, totalPrice: number }>){
            return {...state, contacts: action.payload.contacts, totalPrice:action.payload.totalPrice, orderList: action.payload.orderList}
        },
    },
})

export const orderReducer = slice.reducer
export const {setOrderList} = slice.actions




