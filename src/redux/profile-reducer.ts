import {createSlice, PayloadAction} from "@reduxjs/toolkit";
// import {UserMetadata} from "firebase/auth";




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
