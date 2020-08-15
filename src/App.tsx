import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
};

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {
            id: todolistId1,
            title: "What to learn",
            filter: "all"
        },
            {
            id: todolistId2,
            title: "What to buy",
            filter: "all"
        },
])
;

let [tasks, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "React", isDone: true},
    ],
        [todolistId2]: [
        {id: v1(), title: "Milk", isDone: false},
        {id: v1(), title: "React book", isDone: true},
    ]
});

function addTask(title: string, todolistId:string) {
    let task = {id: v1(), title: title, isDone: false}
    let todolistTasks = tasks[todolistId];
    tasks[todolistId] = [task, ...todolistTasks]
    setTasks({...tasks})
}

function removeTask(id: string, todolistId:string) {
    let todolistTasks = tasks[todolistId];
        tasks[todolistId] = todolistTasks.filter(t => t.id != id)
    setTasks({...tasks})
}

function changeFilter(value: FilterValuesType, todolistId:string) {
    let todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) {
        todolist.filter = value
        setTodolists([...todolists])
    }
}

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        let todolistTasks = tasks[todolistId];
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    function changeTitleValue(id: string, title: string, todolistId: string) {
        let todolistTasks = tasks[todolistId];
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.title = title
            setTasks({...tasks})
        }
    }
    function changeTodolistTitle(id: string, newTitle: string) {
        let todolist = (todolists.find(tl => tl.id === id))
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }

    function removeTodolist(id: string) {
    setTodolists(todolists.filter(tl => tl.id != id))
        delete tasks[id];
    setTasks({...tasks});
    }

    function addTodolist(title: string) {
    let newTodolistId = v1()
        let newTodolist: TodolistType = {id: newTodolistId, title: title, filter: "all"}
        setTodolists([newTodolist, ...todolists])
        setTasks({
            ...tasks,
            [newTodolistId]: []
        })
    }

return (
    <div className="App">
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Menu/>
                </IconButton>
                <Typography variant="h6">
                    News
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
        <Container fixed>
            <Grid container  style={{padding: "20px"}}>
        <AddItemForm addItem={addTodolist}/></Grid>
            <Grid container spacing={3}>
        {
            todolists.map(tl => {
                let allTodolistTasks = tasks[tl.id];
                let taskForTodolist = allTodolistTasks;

                if (tl.filter === "active") {
                    taskForTodolist = allTodolistTasks.filter(t => t.isDone === false)
                }
                if (tl.filter === "completed") {
                    taskForTodolist = allTodolistTasks.filter(t => t.isDone === true)
                }

               return <Grid item>
                   <Paper style={{padding: "10px"}}><Todolist
                   key={tl.id}
                   id={tl.id}
                   title={tl.title}
                   tasks={taskForTodolist}
                   removeTask={removeTask}
                   addTask={addTask}
                   changeFilter={changeFilter}
                   changeStatus={changeStatus}
                   changeTitleValue={changeTitleValue}
                   changeTodolistTitle={changeTodolistTitle}
                   filter={tl.filter}
                   removeTodolist={removeTodolist}
               />
                   </Paper>
                   </Grid>
            })
        }
            </Grid>
        </Container>
    </div>
);
}

export default App;
