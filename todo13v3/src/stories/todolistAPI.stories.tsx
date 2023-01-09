import React, {useEffect, useState} from 'react'
import {taskAPI, todolistAPI} from "./API";

export default {
    title: 'API'
}

const idForTodolist = "afd2b080-c228-41e1-a780-29cdf4e74823"
const titleForTodolist = '1st'
const idForTask = "2c7eebcc-5541-4396-bbf2-f6081c66b8f0"
const titleForTask = 'cat mode on'

//Todolists
export const GetTodolists = () => {
    const [todolists, setTodolists] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
            .then(data => setTodolists(data))
    }, [])
    return <div>
        <div>{JSON.stringify(todolists)}</div>
    </div>
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
        <input placeholder={'todolists name'} value={value} onChange={(e) => setValue(e.currentTarget.value)}/>
        <button onClick={onClickButtonHandler}>Submit</button>
        <div>{JSON.stringify(state)}</div>
    </div>
}
export const DeleteTodolist = () => {
    const [todolist, setTodolist] = useState<any>(null)
    const [value, setValue] = useState<any>('')

    const deleteHandler = (value: string) => {
        todolistAPI.deleteTodolist(value)
            .then(response => {
                console.log(response)
                setTodolist(response.data.resultCode)
            })
    }
    return <div>
        <input placeholder={'todolistId'} value={value} onChange={e => setValue(e.currentTarget.value)}/>
        <button onClick={() => deleteHandler(value)}>Delete</button>
        <div>Result code: {JSON.stringify(todolist)}</div>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [todolist, setTodolist] = useState<any>(null)
    const [todoId, setTodoId] = useState<any>('')
    const [todoTitle, setTodoTitle] = useState<any>('')

    const updateHandler = (todoId: string, todoTitle: string) => {
        todolistAPI.updateTodolist(todoId, todoTitle)
            .then(response => setTodolist(response.data))
    }

    return <div>
        <input placeholder={'todolistId'} value={todoId} onChange={e => setTodoId(e.currentTarget.value)}/>
        <input placeholder={'new todolistTitle'} value={todoTitle} onChange={e => setTodoTitle(e.currentTarget.value)}/>
        <button onClick={() => updateHandler(todoId, todoTitle)}>Update</button>
        <div>Result code: {JSON.stringify(todolist)}</div>
    </div>
}

//Tasks
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<any>('')
    const onClickButtonHandler = () => {
        taskAPI.getTask(todoId)
            .then(data => setState(data))
    }
    return <div>
        <input placeholder={'todolist Id'} value={todoId} onChange={(e) => setTodoId(e.currentTarget.value)}/>
        <button onClick={onClickButtonHandler}>Get Task</button>
        <div>{JSON.stringify(state)}</div>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<any>('')
    const [titleName, setTitleName] = useState<any>('')

    const onClickButtonHandler = () => {
        taskAPI.createTask(todoId, titleName)
            .then(data => {
                console.log(data)
                setState(data.data.item)
            })
    }
    return <div>
        <input placeholder={'todolist Id'} value={todoId} onChange={(e) => setTodoId(e.currentTarget.value)}/>
        <input placeholder={'new Title name'} value={titleName} onChange={(e) => setTitleName(e.currentTarget.value)}/>
        <button onClick={onClickButtonHandler}>Create Task</button>
        <div>{JSON.stringify(state)}</div>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<any>('')
    const [titleId, setTitleId] = useState<any>('')

    const onClickButtonHandler = () => {
        taskAPI.deleteTask(todoId, titleId)
            .then(response => {
                console.log(response)
                setState(response.data)
            })
    }

    return <div>
        <input placeholder={'todolist Id'} value={todoId} onChange={(e) => setTodoId(e.currentTarget.value)}/>
        <input placeholder={'Title Id to delete'} value={titleId} onChange={(e) => setTitleId(e.currentTarget.value)}/>
        <button onClick={onClickButtonHandler}>Delete Task</button>
        <div>{JSON.stringify(state)}</div>
    </div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<any>('')
    const [titleId, setTitleId] = useState<any>('')
    const [titleName, setTitleName] = useState<any>('')
    const [description, setDescription] = useState<any>('')
    const [completed, setCompleted] = useState<any>(null)
    const [status, setStatus] = useState<any>(null)
    const [priority, setPriority] = useState<any>(null)
    const [startDate, setStartDate] = useState<any>('')
    const [deadline, setDeadline] = useState<any>('')

    const onClickButtonHandler = () => {
        taskAPI.updateTask(
            todoId,
            titleId,
            titleName,
            description,
            completed,
            status,
            priority,
            startDate,
            deadline)
            .then(data => {
                console.log(data)
                setState(data)
            })
    }

    return <div>
        <input placeholder={'todolist Id'} value={todoId} onChange={(e) => setTodoId(e.currentTarget.value)}/>
        <input placeholder={'Title Id to update'} value={titleId} onChange={(e) => setTitleId(e.currentTarget.value)}/>
        <input placeholder={'titleName to update'} value={titleName} onChange={(e) => setTitleName(e.currentTarget.value)}/>
        <input placeholder={'description to update'} value={description} onChange={(e) => setDescription(e.currentTarget.value)}/>
        <input placeholder={'completed boolean to update'} value={completed} onChange={(e) => setCompleted(e.currentTarget.value)}/>
        <input placeholder={'status number to update'} value={status} onChange={(e) => setStatus(e.currentTarget.value)}/>
        <input placeholder={'priority number to update'} value={priority} onChange={(e) => setPriority(e.currentTarget.value)}/>
        <input placeholder={'startDate to update'} value={startDate} onChange={(e) => setStartDate(e.currentTarget.value)}/>
        <input placeholder={'deadline to update'} value={deadline} onChange={(e) => setDeadline(e.currentTarget.value)}/>
        <button onClick={onClickButtonHandler}>Update Task</button>
        <div>{JSON.stringify(state)}</div>
    </div>
}


