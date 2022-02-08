import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type propsType = {
    addTask: (task: string) => void
}

export const FullInput = (props: propsType) => {

    const [task, setNewTask] = useState('')

    const addTaskHandler = () => {
        props.addTask(task)
        setNewTask('')
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTask(event.currentTarget.value)
    }

    const addEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

  return (
      <div>
            <input value={task} onChange={onChangeHandler} onKeyPress={addEnterHandler}/>
            <button onClick={addTaskHandler}>+</button>
        </div>
  )
}