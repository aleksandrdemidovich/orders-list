import React from 'react';
import {Button, Container} from "@mui/material";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../components/AppRoutes";


function InfoAboutOrderPage() {
    let navigate = useNavigate();

    const orderInfo = useSelector<AppStateType, any>(state => state.order)

    console.log(JSON.stringify(orderInfo, null, 2))

    return (
        <div className="App">
            <Container maxWidth="xl">
                <h1>Information about order</h1>
                <pre id="json">{JSON.stringify(orderInfo, null, 2)}</pre>
                <Button variant={"contained"}
                        color={"success"}
                        style={{marginLeft:'45%'}}
                        onClick={() => navigate(PATH.PRODUCTS)}>Go To Home Page</Button>
            </Container>
        </div>
    );
}

export default InfoAboutOrderPage;
