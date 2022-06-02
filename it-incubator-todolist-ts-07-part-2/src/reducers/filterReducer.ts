import {FilterValuesType} from "../App";


type changeFilterACType = ReturnType<typeof changeFilterAC>

export const filterReducer = (state: FilterValuesType, action: changeFilterACType) => {
    switch (action.type) {
        case 'CHANGE-FILTER': {
            return action.payload.value
        }
        default: return state
    }
}


export const changeFilterAC = (value: FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {value: value}
    } as const
}