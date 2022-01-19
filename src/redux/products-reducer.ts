import {setAppError, setAppStatus} from "./app-reducer";
import {addDoc, collection, getDocs} from "firebase/firestore";
import db from "../Firebase/firebase";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export type ProductInfo = {
    img: string
    name: string
    description: string
    pricePerOne: number
    id: string
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (param, {dispatch}) => {
    dispatch(setAppError({error: ''}))
    dispatch(setAppStatus({status: 'loading'}));
    let productArr: any = []
    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        querySnapshot.forEach((doc) => {
            productArr.push(doc.data())
        });
        dispatch(setAppStatus({status: "succeeded"}))
        return {products: productArr}
    } catch (err) {
        console.log(err)
        dispatch(setAppError({error: err as string}))
    } finally {
        dispatch(setAppStatus({status: "idle"}))
    }
})

export const addNewProduct = createAsyncThunk('products/addNewProducts', async (param:{ name: string, pricePerOne: number, description: string, imgLink: string }, {dispatch}) => {
    dispatch(setAppError({error: ''}))
    dispatch(setAppStatus({status: 'loading'}));
    try {
        const docRef = await addDoc(collection(db, "products"), {
            name: param.name,
            pricePerOne: param.pricePerOne,
            description: param.description,
            img: param.imgLink,
            id: new Date().getTime()
        });
        dispatch(setAppStatus({status: "succeeded"}))
    } catch (e) {
        console.log(e)
        dispatch(setAppError({error: e as string}))
    } finally {
        dispatch(setAppStatus({status: "idle"}))
    }
})

export const slice = createSlice({
    name: 'products',
    initialState: [] as Array<ProductInfo>,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                if (action.payload) {
                    return action.payload.products
                }
            })
    }
})
export const productsReducer = slice.reducer


