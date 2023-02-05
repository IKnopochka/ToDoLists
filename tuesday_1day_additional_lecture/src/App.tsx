import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

/*import {v1} from 'uuid';*/

function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistId1, title: "What to learn"},
        {id: todolistId2, title: "What to buy"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: {
            data: [
                {id: v1(), title: "HTML&CSS1111", isDone: true},
                {id: v1(), title: "JS1111", isDone: true}
            ],
            filter: "all"
        },
        [todolistId2]: {
            data: [
                {id: v1(), title: "HTML&CSS22222", isDone: true},
                {id: v1(), title: "JS2222", isDone: true}
            ],
            filter: "all"
        }
    });
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter((t) => t.id !== todolistId))
        delete tasks[todolistId]
    }

    function removeTask(todolistId: string, taskId: string) {
        const deleted = tasks[todolistId].data.filter((t) => t.id !== taskId)
        setTasks({...tasks, [todolistId]: {...tasks[todolistId], data: deleted}})
    }

    function addTask(todolistId: string, title: string) {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistId]: {...tasks[todolistId], data: [...tasks[todolistId].data, newTask]}})
    }

    function changeStatus(todolistId: string, taskId: string, newIsDone: boolean) {
        setTasks({
            ...tasks, [todolistId]: {
                ...tasks[todolistId], data: tasks[todolistId].data.map(t => t.id === taskId
                    ? {...t, isDone: newIsDone}
                    : t)
            }
        })
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        setTasks({...tasks, [todolistId]: {...tasks[todolistId], filter: value}})
    }

    return (
        <div className="App">
            {todolists.map((el) => {
                let tasksForTodolist = tasks[el.id].data;
                let filterForTasks = tasks[el.id].filter;
                if (filterForTasks === "active") {
                    tasksForTodolist = tasks[el.id].data.filter(t => !t.isDone);
                }
                if (filterForTasks === "completed") {
                    tasksForTodolist = tasks[el.id].data.filter(t => t.isDone);
                }
                return (
                    <Todolist
                        key={el.id}
                        todolistId={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={filterForTasks}
                        removeTodolist={removeTodolist}
                    />
                )
            })}


        </div>
    );
}

export default App;

//types

type TodolistsType = { id: string, title: string }

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed";
export type TasksStateType = {
    [key: string]: {
        data: TaskType[]
        filter: FilterValuesType
    }

}