import {ItemType} from "./cart-reducer";

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
const initialState: InitialStateType = {
    contacts: null,
    orderList: null,
    totalPrice: null
}

export const orderReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case "SET-CONTACTS":
            return {...state, contacts: action.payload.contacts}
        case "SET-ORDER-LIST":
            return {...state, orderList: action.payload.orderList}
        case "SET-TOTAL-PRICE":
            return {...state, totalPrice: action.payload.totalPrice}
        default:
            return state
    }
}


export const setContactsInfo = (payload: { contacts: ContactsType }) => ({type: 'SET-CONTACTS', payload} as const)
export const setOrderList = (payload: { orderList: Array<ItemType> }) => ({type: 'SET-ORDER-LIST', payload} as const)
export const setTotalPrice = (payload: { totalPrice: number }) => ({type: 'SET-TOTAL-PRICE', payload} as const)


export type AppActionsType =
    | ReturnType<typeof setContactsInfo>
    | ReturnType<typeof setOrderList>
    | ReturnType<typeof setTotalPrice>
