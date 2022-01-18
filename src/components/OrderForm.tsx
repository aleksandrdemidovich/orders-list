import {Button, styled, TextField} from '@mui/material';
import React from 'react';
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../redux/store";
import {ItemType} from "../redux/cart-reducer";
import {setContactsInfo, setOrderList, setTotalPrice} from "../redux/order-reducer";
import {AppStatusType, setAppStatus} from "../redux/app-reducer";
import { Navigate } from 'react-router-dom';
import {PATH} from "./AppRoutes";

type FormikErrorType = {
    name?: string
    surName?: string
    address?: string
    phone?: string
}

function OrderForm() {

    const cartItems = useSelector<AppStateType, Array<ItemType>>(state => state.cart.items)
    const totalPrice = useSelector<AppStateType, number>(state => state.cart.totalCartPrice)
    const appStatus = useSelector<AppStateType, AppStatusType>(state => state.app.status)

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            name: '',
            surName: '',
            address: '',
            phone: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.name) {
                errors.name = 'Required';
            }
            if (!values.surName) {
                errors.surName = 'Required';
            }
            if (!values.address) {
                errors.address = 'Required';
            }
            if (!values.phone) {
                errors.phone = 'Required';
            }
            return errors;
        },
        onSubmit: (values) => {
            dispatch(setAppStatus({status:'loading'}))
            dispatch(setContactsInfo({contacts:values}))
            dispatch(setOrderList({orderList:cartItems}))
            dispatch(setTotalPrice({totalPrice}))
            dispatch(setAppStatus({status:'succeeded'}))
        },
    })

    if(appStatus === 'succeeded'){
        return <Navigate to={PATH.INFO_ABOUT_ORDER}/>
    }

    return (
        <StyledForm onSubmit={formik.handleSubmit}>
            <OrderInput id="filled-basic"
                        label="Name"
                        required
                        variant="outlined"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={!!formik.errors.name}
                        helperText={formik.errors.name}/>
            <OrderInput id="filled-basic"
                        name="surName"
                        label="Surname"
                        required
                        variant="outlined"
                        value={formik.values.surName}
                        onChange={formik.handleChange}
                        error={!!formik.errors.surName}
                        helperText={formik.errors.surName}/>
            <OrderInput id="filled-basic"
                        name="address"
                        label="Address"
                        required
                        variant="outlined"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        error={!!formik.errors.address}
                        helperText={formik.errors.address}/>
            <OrderInput id="filled-basic"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        error={!!formik.errors.phone}
                        helperText={formik.errors.phone}
                        label="Phone"
                        required
                        variant="outlined"/>
            <Button type="submit" variant={"contained"} size={"large"} color={"primary"}
                    style={{width: '80%', margin: '25px 0 25px 0'}}>Order</Button>
        </StyledForm>
    );
}

export default OrderForm;


const StyledForm = styled("form")`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  width: 100%;
`
const OrderInput = styled(TextField)`
  width: 80%;
  margin: 10px 0 10px 0;
`
