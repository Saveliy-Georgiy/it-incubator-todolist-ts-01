import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import styles from "./Todolist.module.css"

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
    id: string,
    title: string,
    tasks: Array<TaskType>
    addTask: (title: string, todolistId:string) => void
    removeTask: (taskId: string, todolistId:string) => void
    changeFilter: (value: FilterValuesType, todolistId:string) => void
    changeStatus:(id:string, isDone:boolean, todolistId:string) => void
    filter: FilterValuesType
    removeTodolist: (id: string) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")

    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if(title.trim() !=="") {
        props.addTask(title, props.id)
        setTitle("")
        } else {
            setError("Title is required")
        }
    }

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if(e.charCode ===13) {
            addTask()
        }
    }

    const onRemoveTodolistHandler = () => props.removeTodolist(props.id)

    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)

    return (
        <div>
            <h3>{props.title}</h3>
            <button onClick={onRemoveTodolistHandler}>X</button>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? styles.error: ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={styles.errorMessage}>{error}</div>}
            </div>
            <ul>
                    {
                        props.tasks.map(t => {

                            const onRemoveHandler = () => props.removeTask(t.id, props.id)
                            const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
                                let newIsDoneValue = e.currentTarget.checked
                                props.changeStatus(t.id, newIsDoneValue, props.id)
                            }
                            return <li key={t.id} className={t.isDone ? styles.isDone: ""}>
                                <input
                                    type="checkbox"
                                    checked={t.isDone}
                                    onChange={onChangeHandler}
                                />
                                <span>{t.title}</span>
                                <button onClick={onRemoveHandler}>X</button>
                            </li>
                        })
                    }
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? styles.activeFilter: ""}
                    onClick={onAllClickHandler}>All</button>
                <button
                    className={props.filter === 'active' ? styles.activeFilter: ""}
                    onClick={onActiveClickHandler}>Active</button>
                <button
                    className={props.filter === 'completed' ? styles.activeFilter: ""}
                    onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}