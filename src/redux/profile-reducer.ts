import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAppError, setAppStatus} from "./app-reducer";
import {updateProfile} from "firebase/auth";
import {auth, db} from "../Firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

export const updateUserProfile = createAsyncThunk('profile/updateProfile',
    async (param: { displayName: string | null, photoURL: string | null }, {dispatch}) => {
    dispatch(setAppError({error: null}))
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const usersRef = doc(db, "users", auth.currentUser!.uid);
        if (auth.currentUser){
            const res = await updateProfile(auth.currentUser, {
                displayName: param.displayName, photoURL: param.photoURL
            })
            await updateDoc(usersRef, {
                displayName: param.displayName,
                photoURL: param.photoURL
            });

        }
        dispatch(setAppStatus({status: 'succeeded'}))
    } catch (error: any) {
        dispatch(setAppError({error: error.message}))
    }
})


export type ProfileType = {
    displayName: string | null
    email: string | null
    photoURL: string | null
    metadata: {
        createdAt: string | undefined
        lastLoginAt: string | undefined
    }
}
type InitialStateType = {
    profile: ProfileType | null
}

export const slice = createSlice({
    name: 'profile',
    initialState: {
        profile: null
    } as InitialStateType,
    reducers: {
        setUserProfile(state, action: PayloadAction<{ profile: ProfileType }>){
            return {...state, profile: action.payload.profile};
        },
    },
})

export const profileReducer = slice.reducer
export const {setUserProfile} = slice.actions
