import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "React", isDone: true},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "rest api", isDone: true},
        {id: v1(), title: "graphQL", isDone: true},
    ]);

    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false}
        let newTasks = [task, ...tasks]
        setTasks(newTasks)
    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id != id)
        setTasks(filteredTasks)
    }

    let [filter, setFilter] = useState<FilterValuesType>("all")

    let taskForTodolist = tasks;

    if (filter === "active") {
        taskForTodolist = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        taskForTodolist = tasks.filter(t => t.isDone === true)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    function changeStatus(id:string, isDone:boolean) {
        let task = tasks.find(t=> t.id===id)
        if(task) {
            task.isDone=isDone
            setTasks([...tasks])
        }
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={taskForTodolist}
                removeTask={removeTask}
                addTask={addTask}
                changeFilter={changeFilter}
                changeStatus={changeStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
