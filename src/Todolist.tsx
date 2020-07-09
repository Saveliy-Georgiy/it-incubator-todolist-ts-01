import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import styles from "./Todolist.module.css"

type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
    title: string,
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    changeStatus:(id:string, isDone:boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")

    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if(title.trim() !=="") {
        props.addTask(title)
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

    const onAllClickHandler = () => props.changeFilter("all")
    const onActiveClickHandler = () => props.changeFilter("active")
    const onCompletedClickHandler = () => props.changeFilter("completed")

    return (
        <div>
            <h3>{props.title}</h3>
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

                            const onRemoveHandler = () => props.removeTask(t.id)
                            const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
                                let newIsDoneValue = e.currentTarget.checked
                                props.changeStatus(t.id, newIsDoneValue)
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