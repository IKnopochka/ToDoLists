import {FilterValuesType, TodolistType} from "../App";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistReducer
} from "./todolist-reducer";
import {v1} from "uuid";

test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    const endState = todolistReducer(startState, RemoveTodolistAC(todolistId1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})
test('todolist\'s filter should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let newFilter: FilterValuesType = 'active'

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const action = {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        id: todolistId1,
        filter: newFilter}

    const endState = todolistReducer(startState, ChangeTodolistFilterAC(todolistId1, newFilter))
    expect(endState[0].filter).toBe('active')
    expect(endState.length).toBe(2)
})
test('todolist\'s title should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTitle = "newTitle"

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    const endState = todolistReducer(startState, ChangeTodolistTitleAC(todolistId1, newTitle))
    expect(endState[0].title).toBe("newTitle")
})
test('new todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let newTitle = "newTitle"

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    const endState = todolistReducer(startState, AddTodolistAC(newTitle))
    expect(endState.length).toBe(3)
})