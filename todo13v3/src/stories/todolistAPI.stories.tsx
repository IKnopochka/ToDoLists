import React, {useEffect, useState} from 'react'
import {taskAPI, todolistAPI} from "./API";

export default {
    title: 'API'
}

const idForTodolist = "e809767a-fd8b-4d7a-8b1c-18c3593b1951"
const titleForTodolist = 'iridfvdfvna'
const idForTask = "2c7eebcc-5541-4396-bbf2-f6081c66b8f0"
const titleForTask = 'cat mode on'
const itemTask = {
    todoListId: idForTodolist,
    id: idForTask,
    description: 'serjydtxhgfdb',
    title: 'string',
    completed: true,
    status: 15754635,
    priority:1345345,
    startDate: 'str34543ing',
    deadline: '345345ing'
}

//Todolists
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
            .then(data => setState(data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [value, setValue] = useState<string>('')
    /*useEffect(() => {
        todolistAPI.createTodolist(value)
            .then(data => setState(data))

    }, [])*/
    const onClickButtonHandler = () => {
            todolistAPI.createTodolist(value)
                .then(data => setState(data))
    }

    return <div>
        <input value={value} onChange={(e) => setValue(e.currentTarget.value)}/>
        <button onClick={onClickButtonHandler}>Submit</button>
        <div>{JSON.stringify(state)}</div>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistAPI.deleteTodolist(idForTodolist)
            .then(response => {
                console.log(response)
                setState(response.data.resultCode)
            })
    }, [])

    return <div>
        <div>Result code: {JSON.stringify(state)}</div>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.updateTodolist(idForTodolist, titleForTodolist)
            .then(response => setState(response.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

//Tasks
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        taskAPI.getTask(idForTodolist)
            .then(data => setState(data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        taskAPI.createTask(idForTodolist, titleForTask)
            .then(data => {
                console.log(data)
                setState(data.data.item)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        taskAPI.deleteTask(idForTodolist,idForTask)
            .then(response => {
                console.log(response)
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        taskAPI.updateTask(
            idForTodolist,
            idForTask,
            'serjydtxhgfdb',
            'string',
            true,
            15754635,
            1345345,
            '2022-12-02T17:44:25.913',
            '2022-12-02T17:44:25.913')
            .then(data => {
                console.log(data)
                setState(data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}


