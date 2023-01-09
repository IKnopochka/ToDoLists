import axios from "axios";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': 'caec2d06-05c5-409a-8dd4-1ef5ae91b427'
    }
})

type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
type ResponseTodolistType<D = {}> = {
    resultCode: number
    messages: string[],
    fieldsErrors: string[]
    data: D
}
type ItemTaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type ReturnGetTaskType = {
    items: ItemTaskType[],
    totalCount: number
    error: string
}
type ReturnPostDeletePutTaskType<D> = {
    data: D
    resultCode: number
    messages: string[]
}

export const todolistAPI = {
    getTodolist() {
        return instance.get<TodolistType[]>('todo-lists')
            .then(response => response.data)
    },
    createTodolist(title: string) {
        return instance.post<ResponseTodolistType<{ item: TodolistType }>>('todo-lists', {title})
            .then(response => response.data)
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseTodolistType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseTodolistType>(`todo-lists/${todolistId}`, {title})
    }
}

export const taskAPI = {
    getTask(todolistId: string) {
        return instance.get<ReturnGetTaskType>(`todo-lists/${todolistId}/tasks`)
            .then(response => response.data)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ReturnPostDeletePutTaskType<{ item: ItemTaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
            .then(response => response.data)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ReturnPostDeletePutTaskType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, title: string, description: string, completed: boolean, status: number, priority: number, startDate: string, deadline: string) {
        return instance.put<ReturnPostDeletePutTaskType<{ item: ItemTaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`,
            {title, description, completed, status, priority, startDate, deadline})
            .then(response => response.data)
    }
}

// todolistId: string, taskId: string, title:string, description:string, completed: boolean, status: number, priority: number, startDate: string, deadline: string