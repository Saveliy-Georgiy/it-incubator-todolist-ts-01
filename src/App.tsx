import React, { useState } from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    let [tasks, setTasks] = useState([
        {id: 1, title: "JS", isDone: false},
        {id: 2, title: "React", isDone: true},
        {id: 3, title: "Redux", isDone: false},
        {id: 4, title: "rest api", isDone: true},
        {id: 5, title: "graphQL", isDone: true},
    ]);

    function removeTask(id: number) {
        let filteredTasks = tasks.filter(t => t.id != id)
        setTasks(filteredTasks)
    }

    let [filter, setFilter] = useState<FilterValuesType>("all")

    let taskForTodolist = tasks;

    if(filter==="active") {
        taskForTodolist = tasks.filter(t => t.isDone===false)
    }
    if(filter==="completed") {
        taskForTodolist = tasks.filter(t => t.isDone===true)
    }

    function changeFilter(value: FilterValuesType) {
setFilter(value)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={taskForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
