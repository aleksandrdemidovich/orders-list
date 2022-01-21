import {Route, Routes} from "react-router-dom";
import React from "react";
import CartPage from "../pages/Cart/CartPage";
import ProductsListPage from "../pages/ProductsList/ProductsListPage";
import InfoAboutOrderPage from "../pages/InformationAboutOrder/InfoAboutOrderPage";
import NewProductPage from "../pages/NewProduct/NewProductPage";
import Login from "../pages/Auth/Login";
import SignUP from "../pages/Auth/SignUP";
import Profile from "../pages/Profile/Profile";
import Settings from "../pages/Settings/Settings";


export const PATH = {
    PRODUCTS: '/products-list',
    CART: '/cart',
    INFO_ABOUT_ORDER: '/info-about-order',
    CREATE_NEW_PRODUCT: '/create-new-product',
    LOGIN: '/login',
    SIGN_UP: '/signUP',
    PROFILE: '/profile',
    SETTINGS: '/settings',
}


function AppRoutes() {

    return (
        <>
            <Routes>
                <Route path='/' element={<ProductsListPage/>}/>
                <Route path={PATH.PRODUCTS} element={<ProductsListPage/>}/>
                <Route path={PATH.CART} element={<CartPage/>}/>
                <Route path={PATH.INFO_ABOUT_ORDER} element={<InfoAboutOrderPage/>}/>
                <Route path={PATH.CREATE_NEW_PRODUCT} element={<NewProductPage/>}/>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.SIGN_UP} element={<SignUP/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.SETTINGS} element={<Settings/>}/>
            </Routes>
        </>
    )
}

export default AppRoutes;
