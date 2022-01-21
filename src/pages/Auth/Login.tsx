import React, {useEffect} from 'react';
import {Alert, Button, Divider, Paper, styled, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {AppStatusType} from "../../redux/app-reducer";
import {useFormik} from "formik";
import {Navigate, useNavigate} from "react-router-dom";
import {PATH} from "../../components/AppRoutes";
import {authMe, login} from "../../redux/auth-reducer";
import Preloader from "../../components/Preloader";
import {firebaseConfig, uiConfig} from "../../Firebase/firebase";
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
    const navigate = useNavigate();


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
            // const uiConfig = {
            //     signInFlow: 'popup',
            //     signInSuccessUrl: 'http://localhost:3000/products-list', // This URL is used to return to that page when we got success response for phone authentication.
            //     signInOptions: [{ provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID, defaultCountry: 'EN' },
            //         { provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID, defaultCountry: 'EN'}],
            //     tosUrl: 'http://localhost:3000/'
            // }
            ui.disableAutoSignIn()
            ui.start('#firebaseui-auth-container', uiConfig)


        }
        firebase_()
    })

    if (isLoggedIn) {
        return <Navigate to={PATH.PRODUCTS}/>
    }
    if (appStatus === 'loading') {
        return <Preloader/>
    }




    return (
        <>
            <LoginContainer elevation={8}>
                <h1 style={{marginBottom:'10px'}}>Sign In</h1>

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

                    <Divider style={{color:'gray', width:'90%', margin:'10px 0 10px 0'}} light={false}>or sign in with</Divider>

                    <WidgetContainer id="firebaseui-auth-container">
                        {/*<StyledFirebaseAuth uiCallback={ui => ui.disableAutoSignIn()} uiConfig={uiConfig} firebaseAuth={auth}/>*/}
                    </WidgetContainer>

                    <Button type="submit"
                            variant={"contained"}
                            color={"primary"}
                            style={{width: '90%', margin: '25px 0 10px 0'}}>
                        Login
                    </Button>
                    <Button variant={"contained"}
                            color={"success"}
                            onClick={() => navigate(PATH.SIGN_UP)}
                            style={{width: '90%', margin: '0 0 25px 0'}}>
                        Sign UP
                    </Button>
                </StyledForm>
            </LoginContainer>
        </>
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
  
  @media (min-width: 300px) and (max-width: 768px) {
    width: 90%;
  }
  @media (min-width: 769px) and (max-width: 1440px) {
    width: 50%;
  }
`
const LoginInput = styled(TextField)`
  width: 90%;
  margin: 10px 0 10px 0;
`
const WidgetContainer = styled("div")`
  img{
    width: 20px;
    padding: 5px;
  }
  
  ul{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    list-style-type: none;
    justify-content: center;
    padding: 0;
    margin: 0 auto;
    width: 100%;
    
    li{
      display: flex;
      flex-direction: row;
      width: 200px;
      margin: 5px 0 5px 0;
      
      button{
        display: flex;
        flex-direction: row;
        align-items: center;
        cursor: pointer;
        border: none;
        box-shadow: 0px 9px 10px 5px rgba(34, 60, 80, 0.29);
        
        span:nth-child(2){
          width: 150px;
        }
        
        span:nth-child(3){
          display: none;
        }
      }
    }
    li:nth-child(2),li:nth-child(3),li:nth-child(4){
      button{
        color: white;
      }
    }
  }
`
