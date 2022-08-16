import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type ActionType = RemoveTodolistACType |
    ChangeTodolistFilterACType |
    ChangeTodolistTitleACType |
    AddTodolistACType

type RemoveTodolistACType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
type ChangeTodolistFilterACType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}
type ChangeTodolistTitleACType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
type AddTodolistACType = {
    type: 'ADD-TODOLIST'
    title: string
}

export const todolistReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(f => f.id !== action.id)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(m => m.id === action.id ? {...m, filter: action.filter} : m)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(m => m.id === action.id ? {...m, title: action.title} : m)
        case 'ADD-TODOLIST':
            return [...state, {id: v1(), title: action.title, filter: "all"} ]
        default:
            throw new Error('I don\'t get it')
    }
}

export const RemoveTodolistAC = (todolistId1: string):RemoveTodolistACType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId1}
}
export const ChangeTodolistFilterAC = (todolistId1: string, newFilter: FilterValuesType):ChangeTodolistFilterACType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        id: todolistId1,
        filter: newFilter}
}
export const ChangeTodolistTitleAC = (todolistId1: string, newTitle: string):ChangeTodolistTitleACType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todolistId1, title: newTitle}
}
export const AddTodolistAC = (newTitle: string):AddTodolistACType => {
    return {type: 'ADD-TODOLIST', title: newTitle}
}