import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
 type TodolistType = {
     id: string,
     title: string,
     filter: FilterValuesType
 }

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);
    }

    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }

    let [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    const changeStatus = (id: string, value: boolean) => {
        setTasks(tasks.map(m => m.id === id ? {...m, isDone: value} : m))
        console.log(value)
    }

    const todolists: Array<TodolistType> = [
        {id: v1(), title: "What to learn", filter: "completed"},
        {id: v1(), title: "What to buy", filter: "active"}
    ]

    return (
        <div className="App">
            {
                todolists.map((tl) => {
                    return <Todolist title={tl.title}
                                     tasks={tasksForTodolist}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeStatus={changeStatus}
                                     filter={tl.filter}/>
                })}
        </div>
    );
}

export default App;
