import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "./reducers";
import thunkMiddleware from 'redux-thunk'



export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})


export type AppStateType = ReturnType<typeof rootReducer>
export type storeType = typeof store



// @ts-ignore
window.store = store;

