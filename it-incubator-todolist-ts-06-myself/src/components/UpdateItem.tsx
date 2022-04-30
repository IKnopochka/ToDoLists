import React, {ChangeEvent, useState} from 'react';

type UpdateItemPropsType = {
    title: string
    callback: (text: string) => void
}

export const UpdateItem = (props: UpdateItemPropsType) => {

    let [newText, setNewText] = useState(props.title)
    let [edit, setEdit] = useState(true)

    const editSwitcher = () => {
        setEdit(!edit)
        props.callback(newText)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewText(e.currentTarget.value)
    }



    return (
        edit
            ? <span onDoubleClick={editSwitcher}>{props.title}</span>
            : <input value={newText}
                     onChange={onChangeHandler} autoFocus onBlur={editSwitcher}/>
    );
};

