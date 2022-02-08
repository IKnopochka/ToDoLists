import {ChangeEvent, KeyboardEvent} from "react";
import React from "react";

type PropsInput = {
    title: string
    setTitle: (title: string) => void
    addTask: (title: string) => void
}

export const Input = ({title, setTitle, addTask}: PropsInput) => {

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const addEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask(title)
            setTitle('')
        }
    }

    return (
        <div>
            <input value={title} onChange={onChangeHandler} onKeyPress={addEnterHandler}/>
        </div>
    )
}