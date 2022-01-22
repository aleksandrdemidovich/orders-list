import {Avatar, Container, Paper, styled, Typography} from '@mui/material';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {ProfileType} from "../../redux/profile-reducer";
import {authMe} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import {PATH} from "../../components/AppRoutes";


function Profile() {

    const userProfile = useSelector<AppStateType, ProfileType | null >(state => state.profile.profile)
    const userEmail = useSelector<AppStateType, string >(state => state.auth.email)
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(authMe())
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <Container maxWidth="xl">
            <RootInfoContainer elevation={10}>
                <Avatar
                    alt={userProfile!.email as string} src={userProfile!.photoURL !== null ? userProfile!.photoURL : 'I'}
                    sx={{ width: 250, height: 250 }}
                />
                <ProfileInfoContainer>
                    <Typography variant="h4" gutterBottom component="div">
                        You’re Welcome, {userProfile!.displayName ? userProfile!.displayName : userEmail}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom component="div">
                        You’re email: {userProfile!.email}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom component="div">
                        Account created at: {userProfile!.metadata.createdAt}
                </Typography>
                    <Typography variant="subtitle2" gutterBottom component="div">
                        Last sign in at: {userProfile!.metadata.lastLoginAt}
                </Typography>
                </ProfileInfoContainer>

            </RootInfoContainer>
        </Container>
    );
}

export default Profile;

const RootInfoContainer = styled(Paper)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin: 50px 0 50px 0;
  padding: 20px;


`
const ProfileInfoContainer = styled("div")`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  
`
