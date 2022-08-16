import React, {ChangeEvent} from 'react';

type CheckBoxPropsType = {
    callback: (e: boolean) => void
    checked: boolean
}
export const CheckBox = (props: CheckBoxPropsType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callback(e.currentTarget.checked)
        console.log(e.currentTarget.checked)
    }

    return (
            <input type='checkbox' onChange={onChangeHandler} checked={props.checked}/>
    );
};