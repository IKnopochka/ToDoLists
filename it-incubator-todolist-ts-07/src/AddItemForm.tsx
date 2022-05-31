import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "@material-ui/core";
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@material-ui/icons";


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div>
        {/*<TextField id="standard-basic" label="Standard" variant="standard" />*/}
        <TextField id="outlined-basic"
                   error={!!error}
                   variant="outlined"
                   size={'small'}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            /*helperText={error ? "Title is required" : ''}*/
                   label={'Text'}
                   helperText={error}
        />
        <IconButton color={'primary'} onClick={addItem}>
            <AddBox/>
        </IconButton>

        {/*{error && <div className="error-message">{error}</div>}*/}
    </div>
}
