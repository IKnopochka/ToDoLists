import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer'
import {
    GetTasksResponse,
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsAPI,
    UpdateTaskModelType
} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {AppRootStateType} from '../../app/store'
import {AppReducerActionType, Response_Code, setErrorMsg, setStatus} from "../../app/app-reducer";
import axios, {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}

// actions
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: 'UPDATE-TASK', model, todolistId, taskId} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)

// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatus('loading'))
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            if(res.data.error === null) {
                const tasks = res.data.items
                dispatch(setTasksAC(tasks, todolistId))
                dispatch(setStatus('success'))
            } else {
                if (res.data.error) {
                    dispatch(setErrorMsg(res.data.error))
                } else {
                    dispatch(setErrorMsg('Some Error Occured'))
                }
            }

        })
        .catch((e: AxiosError<{ message: string }>) => {
            handleServerNetworkError(dispatch, e.message)
        })
}
export const removeTaskTC = (taskId: string, todolistId: string) => async(dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatus('loading'))
    const res = await todolistsAPI.deleteTask(todolistId, taskId)
    try{
        if(res.data.resultCode === Response_Code.SUCCESS){
            dispatch(removeTaskAC(taskId, todolistId))
            dispatch(setStatus('success'))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    }
    catch(e){
       if(axios.isAxiosError<AxiosError<{ message: string }>>(e)) {
           const err = e.response ? e.response.data.message : e.message
           handleServerNetworkError(dispatch, err)
       }
    }
}
export const addTaskTC = (title: string, todolistId: string) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatus('loading'))
    try {
        const res = await todolistsAPI.createTask(todolistId, title)
        if (res.data.resultCode === 0) {
            dispatch(addTaskAC(res.data.data.item))
            dispatch(setStatus('success'))
        } else {
            if (res.data.messages.length) {
                dispatch(setErrorMsg(res.data.messages[0]))
            } else {
                dispatch(setErrorMsg('Some Error Occured'))
            }
        }
    } catch (e) {
        if (axios.isAxiosError<AxiosError<{ message: string }>>(e)) {
            const err = e.response ? e.response.data.message : e.message
            handleServerNetworkError(dispatch, err)
        }
    }
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }
        dispatch(setStatus('loading'))
        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === Response_Code.SUCCESS) {
                    dispatch(updateTaskAC(taskId, domainModel, todolistId))
                    dispatch(setStatus('success'))
                } else {
                    if (res.data.messages.length) {
                        dispatch(setErrorMsg(res.data.messages[0]))
                    } else {
                        dispatch(setErrorMsg('Some Error Occured'))
                    }
                }
            })
            .catch((e: AxiosError<{ message: string }>) => {
                const err = e.response ? e.response.data.message : e.message
                handleServerNetworkError(dispatch, err)
            })
    }

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>
    //in app-reducer
    | AppReducerActionType
