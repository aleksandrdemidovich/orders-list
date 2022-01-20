import React, {useEffect} from 'react';
import {Alert, Button, Container, IconButton, Paper, styled, TextField, Tooltip} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {AppStatusType} from "../../redux/app-reducer";
import {useFormik} from "formik";
import Preloader from "../../components/Preloader";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Navigate, useNavigate} from "react-router-dom";
import {PATH} from "../../components/AppRoutes";
import {authMe, signUP} from "../../redux/auth-reducer";


type FormikErrorType = {
    email?: string
    password?: string
    repeatPassword?: string
}


function SignUP() {

    const appStatus = useSelector<AppStateType, AppStatusType>(state => state.app.status)
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)
    const err = useSelector<AppStateType, string | null>(state => state.app.error)

    const dispatch = useDispatch()
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            repeatPassword: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            }
            if (!values.password) {
                errors.password = 'Required';
            }
            if(values.password !== values.repeatPassword){
                errors.password = 'Password mismatch';
                errors.repeatPassword = 'Password mismatch'
            }
            return errors;
        },
        onSubmit: async (values) => {
            dispatch(signUP({email: formik.values.email, password: formik.values.password}))
            formik.resetForm()
        },
    })



    useEffect(() => {
        dispatch(authMe())
    }, [])

    if(isLoggedIn){
        return <Navigate to={PATH.PRODUCTS}/>
    }
    if (appStatus === 'loading') {
        return <Preloader/>
    }

    return (
        <Container maxWidth="xl">
            <SignUPContainer elevation={8}>
                <SignUPHeader>
                    <Tooltip title={'Back to login'}>
                        <IconButton onClick={() => navigate(PATH.LOGIN)}>
                            <ArrowBackIcon/>
                        </IconButton>
                    </Tooltip>
                    <h1>Sign UP</h1>
                </SignUPHeader>
                <StyledForm onSubmit={formik.handleSubmit}>
                    <SignUPInput variant={"outlined"} label={'Login'} required
                                 name="email"
                                 value={formik.values.email}
                                 onChange={formik.handleChange}
                                 error={!!formik.errors.email}
                                 helperText={formik.errors.email}/>
                    <SignUPInput variant={"outlined"} label={'Password'} required
                                 type={"password"}
                                 name="password"
                                 value={formik.values.password}
                                 onChange={formik.handleChange}
                                 error={!!formik.errors.password}
                                 helperText={formik.errors.password}/>
                    <SignUPInput variant={"outlined"} label={'Repeat password'} required
                                 type={"password"}
                                 name="repeatPassword"
                                 value={formik.values.repeatPassword}
                                 onChange={formik.handleChange}
                                 error={!!formik.errors.repeatPassword}
                                 helperText={formik.errors.repeatPassword}/>

                    {err && <Alert style={{width:'80%'}} severity="error">{err}</Alert>}

                    <Button type="submit"
                            variant={"contained"}
                            color={"primary"}
                            style={{width: '80%', margin: '25px 0 25px 0'}}>
                        Sign UP
                    </Button>
                </StyledForm>
            </SignUPContainer>
        </Container>
    );
}

export default SignUP;


const StyledForm = styled("form")`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  width: 100%;
`
const SignUPContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  margin: 100px auto 20px auto;
`
const SignUPHeader = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  
  h1{
    margin: 20px auto;
  }
`
const SignUPInput = styled(TextField)`
  width: 80%;
  margin: 10px 0 10px 0;
`
