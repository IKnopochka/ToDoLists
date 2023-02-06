import React from 'react';

export const LocalStorage = () => {
    type TasksType = {
        id: number,
        title: string
    }

    type CustomType = TasksType & {
        isDone: boolean
    }

    const tasks: CustomType[] = [
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false}
    ]

    const onSaveHandler = () => {
         localStorage.setItem('state', JSON.stringify(tasks))
    }
    const onExtractHandler = () => {
        const valueAsString = localStorage.getItem('state')
        if(valueAsString) JSON.parse(valueAsString)
    }
    const onDeleteHandler = () => {
        localStorage.clear()
    }

    return (
        <div>
            <button onClick={onSaveHandler}>Save</button>
            <button onClick={onExtractHandler}>Extract</button>
            <button onClick={onDeleteHandler}>Delete</button>

            {tasks.map(t => <div>
                <input type={'checkbox'} checked={t.isDone}/>
                {t.title}
            </div>)}
        </div>
    );
};
