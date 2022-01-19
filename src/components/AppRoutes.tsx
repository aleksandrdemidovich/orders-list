import {Route, Routes} from "react-router-dom";
import React from "react";
import CartPage from "../pages/Cart/CartPage";
import ProductsListPage from "../pages/ProductsList/ProductsListPage";
import InfoAboutOrderPage from "../pages/InformationAboutOrder/InfoAboutOrderPage";
import NewProductPage from "../pages/NewProduct/NewProductPage";


export const PATH = {
    PRODUCTS: '/products-list',
    CART: '/cart',
    INFO_ABOUT_ORDER: '/info-about-order',
    CREATE_NEW_PRODUCT:'/create-new-product'
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
            </Routes>
        </>
    )
}

export default AppRoutes;
