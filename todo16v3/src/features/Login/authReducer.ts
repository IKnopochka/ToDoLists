import {authAPI, LoginType} from "../../api/todolists-api";
import {Dispatch} from "redux";

import {
    AppReducerActionsType,
    SetAppErrorActionType,
    setAppStatusAC,
    SetAppStatusActionType, setInitializedAC
} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import axios, {AxiosError} from "axios";
import {clearDataAC} from "../TodolistsList/todolists-reducer";

const initialState = {
    isLogged: false
}

export const authReducer = (state: initialStateType = initialState, action: AuthActionTypes): initialStateType => {
    switch (action.type) {
        case 'SET-IS-LOGGED-IN':
            return {...state, isLogged: action.isLogged}
        default:
            return state


    }
};

//action creators
const isLoggedIn = (isLogged: boolean) => ({type: 'SET-IS-LOGGED-IN', isLogged} as const)

//thunk creators
export const loginTC = (data: LoginType) => async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            dispatch(isLoggedIn(true))
            dispatch(setAppStatusAC('succeeded'))
        }
        else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (err) {
        if (axios.isAxiosError<AxiosError<{ message: string }>>(err)) {
            handleServerNetworkError(err, dispatch)
        }
    }

}
export const logoutTC = () => async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(isLoggedIn(false))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(clearDataAC())
        }
        else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (err) {
        if (axios.isAxiosError<AxiosError<{ message: string }>>(err)) {
            handleServerNetworkError(err, dispatch)
        }
    }

}
export const isAuthMeTC = () => async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.authMe()
        if (res.data.resultCode === 0) {
            dispatch(isLoggedIn(true))
            dispatch(setAppStatusAC('succeeded'))
        }
        else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (err) {
        if (axios.isAxiosError<AxiosError<{ message: string }>>(err)) {
            handleServerNetworkError(err, dispatch)
        }
    } finally {
        dispatch(setInitializedAC(true))
    }

}

//types
type AuthActionTypes =
    | ReturnType<typeof isLoggedIn>
    | ReturnType<typeof clearDataAC>
    | AppReducerActionsType

type initialStateType = typeof initialState