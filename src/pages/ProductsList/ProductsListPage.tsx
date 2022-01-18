import React, {useEffect} from 'react';
import {Container, styled} from "@mui/material";
import ProductCard from "../../components/ProductCard";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import Preloader from "../../components/Preloader";
import {fetchProducts, ProductInfo} from "../../redux/products-reducer";
import {AppStatusType} from "../../redux/app-reducer";


function ProductsListPage() {

    const products = useSelector<AppStateType, Array<ProductInfo>>(state => state.products.products)
    const appStatus = useSelector<AppStateType, AppStatusType>(state => state.app.status)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])



    if(appStatus === 'loading'){
        return <Preloader/>
    }

    const productsElements = products.map(p => {
        return <ProductCard key={p.id} product={p}/>
    })

    return (
        <div className="App">
            <Container maxWidth="xl">
                <CardsContainer>
                    {productsElements}
                </CardsContainer>
            </Container>
        </div>
    );
}

export default ProductsListPage;

const CardsContainer = styled("div")`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 50px;
`
