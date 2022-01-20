import React, {useEffect} from 'react';
import {Alert, Button, Container, Paper, styled, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {AppStatusType} from "../../redux/app-reducer";
import {useFormik} from "formik";
import {Navigate, useNavigate} from "react-router-dom";
import {PATH} from "../../components/AppRoutes";
import {authMe, login} from "../../redux/auth-reducer";
import Preloader from "../../components/Preloader";
import {StyledFirebaseAuth} from "react-firebaseui";
import {FacebookAuthProvider, getAuth, GoogleAuthProvider} from "firebase/auth";
import * as firebaseui from 'firebaseui'
import {app, firebaseConfig} from "../../Firebase/firebase";
import firebase from "firebase/compat/app";






type FormikErrorType = {
    email?: string
    password?: string
}

function Login() {
    const appStatus = useSelector<AppStateType, AppStatusType>(state => state.app.status)
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)
    const err = useSelector<AppStateType, string | null>(state => state.app.error)

    const dispatch = useDispatch()
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            }
            if (!values.password) {
                errors.password = 'Required';
            }
            return errors;
        },
        onSubmit: (values) => {
            dispatch(login({email: formik.values.email, password: formik.values.password}))
            // formik.resetForm()
        },
    })

    useEffect(() => {
        dispatch(authMe())
    }, [])

    useEffect(() => {
        async function firebase_ () {
            let ui = null
            const firebaseui = await import('firebaseui')
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig)
                ui = new firebaseui.auth.AuthUI(firebase.auth())
            } else {
                firebase.app() // if already initialized, use that one
                ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth())
            }
            const uiConfig = {
                signInFlow: 'popup',
                signInSuccessUrl: 'http://localhost:3000/products-list', // This URL is used to return to that page when we got success response for phone authentication.
                signInOptions: [{ provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID, defaultCountry: 'EN' },
                    { provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID, defaultCountry: 'EN'}],
                tosUrl: 'http://localhost:3000/'
            }
            ui.start('#firebaseui-auth-container', uiConfig)
        }
        firebase_()
    }, [])

    if (isLoggedIn) {
        return <Navigate to={PATH.PRODUCTS}/>
    }
    if (appStatus === 'loading') {
        return <Preloader/>
    }




    return (
        <Container maxWidth="xl">
            <LoginContainer elevation={8}>
                <h1>Sign In</h1>
                <div id="firebaseui-auth-container">

                </div>
                <StyledForm onSubmit={formik.handleSubmit}>
                    <LoginInput variant={"outlined"} label={'Login'} required
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={!!formik.errors.email}
                                helperText={formik.errors.email}/>
                    <LoginInput variant={"outlined"} label={'Password'} required
                                type={"password"}
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={!!formik.errors.password}
                                helperText={formik.errors.password}/>

                    {err && <Alert style={{width: '80%'}} severity="error">{err}</Alert>}


                    <Button type="submit"
                            variant={"contained"}
                            color={"primary"}
                            style={{width: '80%', margin: '25px 0 25px 0'}}>
                        Login
                    </Button>
                </StyledForm>
            </LoginContainer>
            <SignUpContainer elevation={8}>
                <h5>Don't have an account yet?</h5>
                <Button variant={"text"} color={"success"} onClick={() => navigate(PATH.SIGN_UP)}>Sign UP</Button>
            </SignUpContainer>
        </Container>
    );
}

export default Login;


const StyledForm = styled("form")`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  width: 100%;
`
const LoginContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  margin: 100px auto 20px auto;
`
const SignUpContainer = styled(Paper)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 30%;
  margin: 0 auto;
`
const LoginInput = styled(TextField)`
  width: 80%;
  margin: 10px 0 10px 0;
`
