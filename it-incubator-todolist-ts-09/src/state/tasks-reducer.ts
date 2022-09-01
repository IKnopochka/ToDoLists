import { TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

type ActionsType = ReturnType<typeof removeTaskAC> |
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof changeTaskStatusAC> |
    ReturnType<typeof changeTaskTitleAC> |
    AddTodolistActionType |
    RemoveTodolistActionType


export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType  => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.id]: state[action.id].filter((f) => f.id !== action.tasksID)}
        case 'ADD-TASK':
            return {...state, [action.id]: [{id: v1(), title: action.title, isDone: true}, ...state[action.id]]}
        case 'CHANGE-TASK-STATUS': {
            return {...state, [action.id]: state[action.id].map(m => m.id === action.taskID ? {...m, isDone: action.status} : m)}
        }
        case 'CHANGE-TASK-TITLE': {
            return {...state, [action.id]: state[action.id].map(m => m.id === action.taskID ? {...m, title: action.title} : m)}
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolistId]: []}
        }
        case 'REMOVE-TODOLIST': {
            /*delete {...state}[action.id]
            return {...state}*/

            let {[action.id]:[], ...rest} = {...state}
            return rest

        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (tasksID: string, todolistId: string) => {
    return { type: 'REMOVE-TASK', tasksID: tasksID, id: todolistId} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return { type: 'ADD-TASK', title: title, id: todolistId} as const
}
export const changeTaskStatusAC = (taskID: string, status: boolean, todolistId: string) => {
    return { type: 'CHANGE-TASK-STATUS', taskID: taskID, status: status, id: todolistId} as const
}
export const changeTaskTitleAC = (taskID: string, title: string, todolistId: string) => {
    return { type: 'CHANGE-TASK-TITLE', taskID: taskID, title: title, id: todolistId} as const
}
