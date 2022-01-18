import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleWare from 'redux-thunk'
import {appReducer} from "./app-reducer";
import {productsReducer} from "./products-reducer";
import {cartReducer} from "./cart-reducer";
import {orderReducer} from "./order-reducer";



let rootReducers = combineReducers({
    app: appReducer,
    products: productsReducer,
    cart: cartReducer,
    order: orderReducer
})


export type AppStateType = ReturnType<typeof rootReducers>
export type storeType = typeof store
const store = createStore( rootReducers, applyMiddleware(thunkMiddleWare))

export default store

// @ts-ignore
window.store = store;

