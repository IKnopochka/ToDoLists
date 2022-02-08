import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";
import {FullInput} from "./components/FullInput";
import {Input} from "./components/Input";
import {NewButton} from "./components/NewButton";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (task: string) => void
}

export function Todolist(props: PropsType) {

    const [task, setNewTask] = useState('')

    /*const addTaskHandler = () => {
        props.addTask(task)
        setNewTask('')
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTask(event.currentTarget.value)
    }

    const addEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }*/

    const changeFilter = (value: FilterValuesType) => {
        props.changeFilter(value)
    }

    const removeTaskHandler = (id: string) => {
        props.removeTask(id)
    }

    const newButtonAddTask = () => {
        props.addTask(task)
        setNewTask('')
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <Input title={task} setTitle={setNewTask} addTask={props.addTask}/>
            <NewButton name={'X'} callback={newButtonAddTask}/>
        </div>
        {/*<FullInput addTask={props.addTask}/>*/}
        {/*<div>
            <input value={task} onChange={onChangeHandler} onKeyPress={addEnterHandler}/>
            <button onClick={addTaskHandler}>+</button>
        </div>*/}
        <ul>
            {
                props.tasks.map(t => <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    {/*<button onClick={() => removeTaskHandler(t.id)}>x</button>*/}
                    <Button name={'XXX'} callback={() => removeTaskHandler(t.id)}/>

                </li>)
            }
        </ul>
        <div>
            {/* <button onClick={() => changeFilter("all")}>All</button>
            <button onClick={() => changeFilter("active")}>Active</button>
            <button onClick={() => changeFilter("completed")}>Completed</button>*/}

            <Button name={'All'} callback={() => changeFilter("all")}/>
            <Button name={'Active'} callback={() => changeFilter("active")}/>
            <Button name={'Completed'} callback={() => changeFilter("completed")}/>
        </div>
    </div>
}
