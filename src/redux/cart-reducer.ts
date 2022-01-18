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
const initialState: InitialStateType = {
    items: [],
    totalCartPrice: 0
}

export const cartReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case "ADD-ITEM-TO-CART":
            return {...state, items: [...state.items, {...action.payload.item, count: 1, totalPrice: action.payload.item.pricePerOne}]}
        case "CALCULATE-TOTAL-PRICE":
            return {...state, totalCartPrice: state.items.map(i => i.totalPrice!).reduce((previousValue, currentValue) => previousValue + currentValue)}
        case "INCREASE-ITEM-COUNT":
            return {...state, items: state.items.map(i => i.id === action.payload.itemId ? {...i, count: i.count! + 1} : i)}
        case "DECREASE-ITEM-COUNT":
            return {...state, items: state.items.map(i => i.id === action.payload.itemId ? {...i, count: i.count! - 1} : i)}
        case "REMOVE-ITEM-TO-CART":
            return {...state, items: state.items.filter(i => i.id !== action.payload.itemId)}
        case "CHANGE-TOTAL-PRICE-ITEM-COUNT":
            return {...state, items: state.items.map(i => i.id === action.payload.itemId ? {...i, totalPrice: i.pricePerOne * i.count!} : i)}
        default:
            return state
    }
}


export const addItemToCart = (payload: { item: ItemType }) => ({type: 'ADD-ITEM-TO-CART', payload} as const)
export const removeItemFromCart = (payload: { itemId: string }) => ({type: 'REMOVE-ITEM-TO-CART', payload} as const)
export const calculateTotalPrice = () => ({type: 'CALCULATE-TOTAL-PRICE'} as const)
export const increaseItemCount = (payload: { itemId: string }) => ({type: 'INCREASE-ITEM-COUNT', payload} as const)
export const decreaseItemCount = (payload: { itemId: string }) => ({type: 'DECREASE-ITEM-COUNT', payload} as const)
export const changeTotalPriceItemCount = (payload: { itemId: string }) => ({type: 'CHANGE-TOTAL-PRICE-ITEM-COUNT', payload} as const)



export type AppActionsType =
    | ReturnType<typeof addItemToCart>
    | ReturnType<typeof calculateTotalPrice>
    | ReturnType<typeof increaseItemCount>
    | ReturnType<typeof decreaseItemCount>
    | ReturnType<typeof removeItemFromCart>
    | ReturnType<typeof changeTotalPriceItemCount>

