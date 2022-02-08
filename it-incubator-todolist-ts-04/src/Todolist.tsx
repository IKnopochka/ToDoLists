import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import classes from './Todolist.module.css'

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (id: string, value: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState(false)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim());
            setTitle("");
        } else {
            setError(true);
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");
    const onChangeCheckedHandler = (id: string, value: boolean) => props.changeStatus(id, value)

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? classes.error : ''}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={classes.errorMessage}>Title is required!</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)
                    /*const onChangeCheckedHandler = (event: ChangeEvent<HTMLInputElement>) => props.changeStatus(t.id, event.currentTarget.checked)*/

                    return <li key={t.id} className={t.isDone ? classes.isDone : ''}>
                        <input type="checkbox" checked={t.isDone}
                               onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeCheckedHandler(t.id, event.currentTarget.checked)}
                        />

                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>

                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? classes.activeFilter : ''} onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? classes.activeFilter : ''} onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'completed' ? classes.activeFilter : ''} onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
