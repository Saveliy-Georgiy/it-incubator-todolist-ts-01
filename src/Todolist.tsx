import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import styles from "./Todolist.module.css"
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
                    <IconButton onClick={onRemoveTodolistHandler}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTask}/>

            <div>
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

                            return <div key={t.id} className={t.isDone ? styles.isDone + " " + styles.task: styles.task}>
                                <Checkbox
                                    color="primary"
                                    checked={t.isDone}
                                    onChange={onChangeCheckboxHandler}
                                />
                               <EditableSpan value={t.title} onChange={onChangeInputHandler}/>
                                <IconButton onClick={onRemoveHandler}>
                                    <Delete/>
                                </IconButton>
                            </div>
                        })
                    }
            </div>
            <div>
                <Button
                    color="default"
                    variant={props.filter === 'all' ? "outlined": "text"}
                    onClick={onAllClickHandler}>All</Button>
                <Button
                    color="primary"
                    variant={props.filter === 'active' ? "outlined": "text"}
                    onClick={onActiveClickHandler}>Active</Button>
                <Button
                    color="secondary"
                    variant={props.filter === 'completed' ? "outlined": "text"}
                    onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    )
}