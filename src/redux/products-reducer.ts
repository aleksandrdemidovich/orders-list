import {Dispatch} from "redux";
import {setAppError, setAppStatus} from "./app-reducer";
import {collection, getDocs} from "firebase/firestore";
import db from "../Firebase/firebase";

export type ProductInfo = {
    img: string
    name: string
    description: string
    pricePerOne: number
    id: string
}
type InitialStateType = {
    products : Array<ProductInfo>
}
const initialState: InitialStateType = {
    products: []
}

export const productsReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case "SET-PRODUCTS":
            return {...state, products: action.products}
        default:
            return state
    }
}

export const setProducts = (products: any ) => ({type: 'SET-PRODUCTS', products} as const)

export const fetchProducts = () => async (dispatch: Dispatch) => {
    dispatch(setAppError({error: ''}))
    dispatch(setAppStatus({status: 'loading'}));
    let productArr : any = []
    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        querySnapshot.forEach((doc) => {
            productArr.push(doc.data())
        });
        dispatch(setProducts(productArr))
        dispatch(setAppStatus({status:"succeeded"}))
    } catch (err) {
        dispatch(setAppError({error: err as string}))
    } finally {
        dispatch(setAppStatus({status:"idle"}))
    }
}

export type AppActionsType =
    | ReturnType<typeof setProducts>

