import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialStateType = {
    status: AppStatusType
    error: string | null
    isInitialized: boolean
}


export const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle',
        error: '',
        isInitialized: false
    } as InitialStateType,
    reducers: {
        setAppStatus(state, action: PayloadAction<{ status: AppStatusType }>){
            return {...state, status: action.payload.status};
        },
        setAppError(state, action: PayloadAction<{ error: string | null }>){
            return {...state, error: action.payload.error}
        },
        setIsInitialized(state, action: PayloadAction<{ isInitialized: boolean }>){
            return {...state, isInitialized: action.payload.isInitialized}
        },
    },
})

export const appReducer = slice.reducer
export const {setAppError, setAppStatus, setIsInitialized} = slice.actions
