import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import styles from "./Todolist.module.css"

type EditableSpanPropsType = {
    value: string
    onChange: (value: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {

    const [editMode, setEditMode] = useState<boolean>(false)

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.value)
    }

    let [title, setTitle] = useState(props.value)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    return editMode
        ? <input
            value={title}
            autoFocus
            onBlur={activateViewMode}
            onChange={onChangeHandler}/>
        : <span onDoubleClick={activateEditMode}>{title}</span>
}