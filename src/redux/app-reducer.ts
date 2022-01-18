export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = {
    status: AppStatusType
    error: string
    isInitialized: boolean
}


const initialState: InitialStateType = {
    status: 'idle',
    error: '',
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-APP-STATUS':
            return {...state, status: action.payload.status};
        case 'SET-APP-ERROR':
            return {...state, error: action.payload.error}
        case 'SET-APP-IS-INITIALIZED':
            return {...state, isInitialized: action.payload.isInitialized}
        default:
            return state
    }
}


export const setAppStatus = (payload: { status: AppStatusType }) => ({type: 'SET-APP-STATUS', payload} as const)
export const setAppError = (payload: { error: string }) => ({type: 'SET-APP-ERROR', payload} as const)
export const setIsInitialized = (payload: { isInitialized: boolean }) => ({
    type: 'SET-APP-IS-INITIALIZED',
    payload
} as const)


export type AppActionsType =
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>
    | ReturnType<typeof setIsInitialized>
