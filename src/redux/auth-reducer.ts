import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAppError, setAppStatus} from "./app-reducer";
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {auth, db} from "../Firebase/firebase";
import {setUserProfile} from "./profile-reducer";
import {addDoc, collection, doc, getDoc, setDoc} from "firebase/firestore";



type InitialStateType = {
    isLoggedIn: boolean
    email: string
}


export const signUP = createAsyncThunk('auth/signUp', async (param: { email: string, password: string }, {dispatch}) => {
    dispatch(setAppError({error: null}))
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await createUserWithEmailAndPassword(auth, param.email, param.password)
        const user = res.user;
        dispatch(addNewUser({uid: user.uid, displayName:user.displayName, email:user.email, photoURL: user.photoURL, createdAt: user.metadata.creationTime}))
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
        console.log(user)
        dispatch(setAppStatus({status: 'succeeded'}))
        return {isLoggedIn: true, email: param.email}
    } catch (error: any) {
        dispatch(setAppError({error: error.message}))
        return {isLoggedIn: false , email: ''}
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
        return {isLoggedIn: false, email: ''}
    } catch (error: any) {
        dispatch(setAppError(error.message))
        dispatch(setAppStatus({status: 'failed'}))
        return {isLoggedIn: false, email: ''}
    }
})
export const authMe = createAsyncThunk('auth/authMe', async (param, {dispatch}) => {
    dispatch(setAppError({error: null}))
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await onAuthStateChanged(auth, async (user) => {
            if (user) {
                const {displayName, email, photoURL, metadata} = user;

                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                console.log(user)
                dispatch(setIsLoggedIn({value: true}))
                dispatch(setUserProfile({profile:{displayName, email, photoURL, metadata:{createdAt: metadata.creationTime, lastLoginAt: metadata.lastSignInTime}}}))
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                } else {
                    dispatch(addNewUser({uid: user.uid, displayName:user.displayName, email:user.email, photoURL: user.photoURL, createdAt: user.metadata.creationTime}))
                }
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
    } finally {
        dispatch(setAppStatus({status: 'idle'}))
    }
})
export const addNewUser = createAsyncThunk('auth/addNewUser',
    async (param: { displayName: any, email: string | null, photoURL: string | null, uid: string, createdAt: string | undefined,}, {dispatch}) => {
    debugger
    dispatch(setAppError({error: ''}))
    dispatch(setAppStatus({status: 'loading'}));
    try {
        const docRef = await setDoc(doc(db, "users", param.uid), {
            displayName: param.displayName,
            email: param.email,
            photoURL: param.photoURL,
            uid: param.uid,
            createdAt: param.createdAt,
        });
        dispatch(setAppStatus({status: "succeeded"}))
    } catch (e) {
        dispatch(setAppError({error: e as string}))
    } finally {
        dispatch(setAppStatus({status: "idle"}))
    }
})

export const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        email: ''
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
                state.email = action.payload.email
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
                state.email = action.payload.email
            })
    }
})

export const authReducer = slice.reducer
export const {setIsLoggedIn} = slice.actions
