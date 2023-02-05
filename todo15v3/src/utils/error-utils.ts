import {AppReducerActionType, setErrorMsg, setStatus} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";

//generic functions
export const handleServerNetworkError = (dispatch: Dispatch<AppReducerActionType>, err: string) => {
    dispatch(setErrorMsg(err))
    dispatch(setStatus('failed'))
}

export const handleServerAppError = <T>(dispatch: Dispatch<AppReducerActionType>, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setErrorMsg(data.messages[0]))
    } else {
        dispatch(setErrorMsg('Some Error Occured'))
    }
}