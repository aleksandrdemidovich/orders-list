import {Button, CircularProgress, Container, Paper, styled, TextField,} from '@mui/material';
import React, {useEffect} from 'react';
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {ProfileType, updateUserProfile} from "../../redux/profile-reducer";
import {AppStatusType, setAppStatus} from "../../redux/app-reducer";
import {Navigate} from "react-router-dom";
import {PATH} from "../../components/AppRoutes";
import {authMe} from "../../redux/auth-reducer";

type FormikErrorType = {
    displayName?: string
    photoURL?: string
}

function Settings() {

    const userProfile = useSelector<AppStateType, ProfileType | null >(state => state.profile.profile)
    const appStatus = useSelector<AppStateType, AppStatusType>(state => state.app.status)
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)


    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            displayName: userProfile!.displayName,
            photoURL: userProfile!.photoURL,
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.displayName) {
                errors.displayName = 'Required';
            }
            if (!values.photoURL) {
                errors.photoURL = 'Required';
            }
            return errors;
        },
        onSubmit: (values) => {
            dispatch(updateUserProfile({displayName: values.displayName, photoURL: values.photoURL}))
        },
    })

    useEffect(() => {
        if(appStatus === 'succeeded'){
            setTimeout(() => dispatch(setAppStatus({status: 'idle'})), 3000)
        }
    }, [appStatus])


    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <Container maxWidth="xl">
            <GeneralSettingsContainer elevation={10}>
                <GeneralSettingsHeader>
                    <h3>Personal data</h3>
                    {appStatus === 'succeeded' && <h5>updated</h5>}
                </GeneralSettingsHeader>
                <form onSubmit={formik.handleSubmit}>
                    <SettingInput id="outlined-basic" label="Full name" fullWidth variant="outlined"
                                  name="displayName"
                                  value={formik.values.displayName}
                                  onChange={formik.handleChange}
                                  error={!!formik.errors.displayName}
                                  helperText={formik.errors.displayName}/>
                    <SettingInput id="outlined-basic" label="Photo url" variant="outlined"
                                  name="photoURL"
                                  value={formik.values.photoURL}
                                  onChange={formik.handleChange}
                                  error={!!formik.errors.photoURL}
                                  helperText={formik.errors.photoURL}/>
                    <SettingButtonSuccess type={"submit"} color={"success"} variant={"contained"}
                                          disabled={appStatus === 'loading'}
                                          endIcon={appStatus === 'loading' ? <CircularProgress size={'1.5rem'} color="success"/> : ''}
                    >{appStatus === "loading" ? ' ' : 'Save'}</SettingButtonSuccess>
                </form>
            </GeneralSettingsContainer>
        </Container>
    );
}

export default Settings;

const GeneralSettingsContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 50px auto;
  padding: 0 30px 30px 30px;
  h3 {
    margin: 10px 0 20px 0;
  }
`
const GeneralSettingsHeader = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  h3 {
    margin: 10px 0 20px 0;
  }
  h5{
    margin: 10px 0 20px 0;
    color: #66bb6a;
    opacity: 0.6;
  }
`
const SettingInput = styled(TextField)`
  width: 100%;
  margin: 10px 0 10px 0;
`
const SettingButtonSuccess = styled(Button)`
  width: 25%;
  margin-left: 75%;
`
