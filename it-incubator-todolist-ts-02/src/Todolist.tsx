import React from 'react';
import {filterType} from "./App";

type TaskType = {
    id: number
    title: string
    isDone: boolean

}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask:(id:number)=>void
    filter: (value: filterType) => void
}

export function Todolist(props: PropsType) {
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {props.tasks.map (m => {
                return (
                    <li key={m.id}>
                        <button onClick={() => {props.removeTask(m.id)}}>x</button>
                        <input type="checkbox" checked={m.isDone}/>
                        <span>{m.title}</span></li>
                )
            })}
            {/*<li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>
            <li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>
            <li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>*/}
        </ul>
        <div>
            <button onClick={()=>{props.filter("all")}}>All</button>
            <button onClick={()=>{props.filter('active')}}>Active</button>
            <button onClick={()=>{props.filter('completed')}}>Completed</button>
        </div>
    </div>
}
