import {combineReducers} from "redux";
import {productsReducer} from "./products-reducer";
import {cartReducer} from "./cart-reducer";
import {orderReducer} from "./order-reducer";
import {appReducer} from "./app-reducer";
import {authReducer} from "./auth-reducer";

export const rootReducer = combineReducers({
    app: appReducer,
    products: productsReducer,
    cart: cartReducer,
    order: orderReducer,
    auth: authReducer,
})
