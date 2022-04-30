import React, {useState} from 'react';

type EditableSpanPropsType = {
    title: string
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    let[edit, setEdit]= useState(false)

    const switchEdit = () => {
        setEdit(!edit)
    }

    return (
            edit ?<input value={props.title} autoFocus onBlur={switchEdit}/>:<span onDoubleClick={switchEdit}>{props.title}</span>
    );
};