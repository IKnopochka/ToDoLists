import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';


export type filterType = "all" | "active" | "completed"

function App() {

    const [tasks1, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ])

    const removeTask = (mId: number) => {
        setTasks(tasks1.filter(f => f.id !== mId))
    }

    let [filter, setMyFilter] = useState<filterType>('all')

    const setFilter = (value: filterType) => {
        setMyFilter(value)
    }

    let newTask = tasks1;
    if (filter === 'active') {
        newTask = tasks1.filter(f => !f.isDone)
    }
    if (filter === "completed") {
        newTask = tasks1.filter(f => f.isDone)
    }



    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={newTask}
                removeTask={removeTask}
                filter={setFilter}
                />
        </div>
    );
}

export default App;
