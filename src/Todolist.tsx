import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import styles from "./Todolist.module.css"
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
    changeTitleValue:(id:string, title:string, todolistId:string) => void
    changeTodolistTitle:(id: string, newTitle:string) => void
    filter: FilterValuesType
    removeTodolist: (id: string) => void
}

export function Todolist(props: PropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    const onRemoveTodolistHandler = () => props.removeTodolist(props.id)

    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)

    return (
        <div>
                <h3>
                    <EditableSpan value={props.title} onChange={changeTodolistTitle}/>
                    <button onClick={onRemoveTodolistHandler}>X</button>
                </h3>
                <AddItemForm addItem={addTask}/>

            <ul>
                    {
                        props.tasks.map(t => {

                            const onRemoveHandler = () => props.removeTask(t.id, props.id)
                            const onChangeCheckboxHandler = (e:ChangeEvent<HTMLInputElement>) => {
                                let newIsDoneValue = e.currentTarget.checked
                                props.changeStatus(t.id, newIsDoneValue, props.id)
                            }

                            const onChangeInputHandler = (value: string) => {
                                props.changeTitleValue(t.id, value, props.id)
                            }

                            return <li key={t.id} className={t.isDone ? styles.isDone + " " + styles.task: styles.task}>
                                <input
                                    type="checkbox"
                                    checked={t.isDone}
                                    onChange={onChangeCheckboxHandler}
                                />
                               <EditableSpan value={t.title} onChange={onChangeInputHandler}/>
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