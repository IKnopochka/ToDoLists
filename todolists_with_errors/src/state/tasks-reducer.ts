import { TasksStateType } from '../App';
import {AddTodolistActionType} from "./todolists-reducer";

type ActionsType = AddTodolistActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        default:
            return state;
    }
}


