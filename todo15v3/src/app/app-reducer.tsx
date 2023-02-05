import {Dispatch} from "redux";

const initialState = {
    status: 'loading' as RequestStatusType,
    errorMsg: null as null | string
}

export const appReducer = (state: AppInitialStateType = initialState, action: AppReducerActionType) => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "SET-ERROR-MSG":
            return {...state, errorMsg: action.errorMsg}
        default:
            return state
    }
}
//ThunkCreators
export const setErrorTC = () => (dispatch: Dispatch<AppReducerActionType>) => {

}
//ActionCreators
export const setStatus = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setErrorMsg = (errorMsg: null | string) => ({type: 'SET-ERROR-MSG', errorMsg} as const)

//types
export enum Response_Code {
    SUCCESS =  0,
    ERROR = 1,
    CAPTCHA = 10
}

export type RequestStatusType = 'idle' | 'loading' | 'success' | 'failed';
type AppInitialStateType = typeof initialState
export type AppReducerActionType =
    | ReturnType<typeof setStatus>
    | ReturnType<typeof setErrorMsg>