import { TasksStateType } from '../App';
import {addTodolistAC} from "./todolists-reducer";

type ActionsType = ReturnType<typeof addTodolistAC>

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    debugger
    switch (action.type) {
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'ADD-TASK': {
            return {...state}
        }
        default:
            return state;
    }
}


