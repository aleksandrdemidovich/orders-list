import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAppError, setAppStatus} from "./app-reducer";
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {auth} from "../Firebase/firebase";



type InitialStateType = {
    isLoggedIn: boolean
}


export const signUP = createAsyncThunk('auth/signUp', async (param: { email: string, password: string }, {dispatch}) => {
    dispatch(setAppError({error: null}))
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await createUserWithEmailAndPassword(auth, param.email, param.password)
        const user = res.user;
        console.log(user)
        dispatch(setAppStatus({status: 'succeeded'}))
    } catch (error: any) {
        dispatch(setAppError({error: error.message}))
    } finally {
        dispatch(setAppStatus({status: 'idle'}))
    }
})
export const login = createAsyncThunk('auth/login', async (param: { email: string, password: string }, {dispatch}) => {
    dispatch(setAppError({error: null}))
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await signInWithEmailAndPassword(auth, param.email, param.password)
        const user = res.user;
        dispatch(setAppStatus({status: 'succeeded'}))
        return {isLoggedIn: true}
    } catch (error: any) {
        dispatch(setAppError({error: error.message}))
        return {isLoggedIn: false}
    } finally {
        dispatch(setAppStatus({status: 'idle'}))
    }
})
export const logout = createAsyncThunk('auth/logout', async (param, {dispatch}) => {
    dispatch(setAppError({error: null}))
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await signOut(auth)
        dispatch(setAppStatus({status: 'succeeded'}))
        return {isLoggedIn: false}
    } catch (error: any) {
        dispatch(setAppError(error.message))
        console.log(error)
        dispatch(setAppStatus({status: 'failed'}))
        return {isLoggedIn: false}
    }
})
export const authMe = createAsyncThunk('auth/authMe', async (param, {dispatch}) => {
    dispatch(setAppError({error: null}))
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                console.log(user.displayName)
                dispatch(setIsLoggedIn({value: true}))
                dispatch(setAppStatus({status: 'succeeded'}))
            } else {
                // User is signed out
                dispatch(setIsLoggedIn({value: false}))
                dispatch(setAppStatus({status: 'succeeded'}))
            }})
    } catch (error: any) {
        dispatch(setAppError(error.message))
        dispatch(setAppStatus({status: 'failed'}))
        dispatch(setIsLoggedIn({value: false}))
    }
})


export const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    } as InitialStateType,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    },
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
    }
})

export const authReducer = slice.reducer
export const {setIsLoggedIn} = slice.actions
