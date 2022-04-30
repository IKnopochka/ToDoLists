import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    callback: (text: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    let [text, setText] = useState(props.title)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }

    let[edit, setEdit]= useState(false)

    const switchEdit = () => {
        setEdit(!edit)
        props.callback(text)
    }

    return (
            edit
                ?<input value={text} onChange={onChangeHandler} autoFocus onBlur={switchEdit}/>
                :<span onDoubleClick={switchEdit}>{props.title}</span>
    );
};