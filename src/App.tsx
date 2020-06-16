import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {

    const tasks1 = [
        {id: 1, title: "JS", isDone: false},
        {id: 2, title: "React", isDone: true},
        {id: 3, title: "Redux", isDone: false}
    ]

    const tasks2 = [
        {id: 1, title: "hello", isDone: true},
        {id: 2, title: "Yo", isDone: false},
        {id: 3, title: "how are you?", isDone: false}
    ]

    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasks1}/>
            <Todolist title="Songs" tasks={tasks2}/>
        </div>
    );
}

export default App;
