import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {TaskType} from "./Todolist";
import {changeTaskStatusAC, removeTaskAC} from "./state/tasks-reducer";
import {changeTodolistTitleAC} from "./state/todolists-reducer";

type TaskWithReduxPropsType = {
    todolistId: string
    task: TaskType
}

const TaskWithRedux = memo(({todolistId, task}: TaskWithReduxPropsType) => {
    const dispatch = useDispatch();

    const onClickHandler = () => dispatch(removeTaskAC(task.id, todolistId))
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(task.id, newIsDoneValue, todolistId))
    }
    const onTitleChangeHandler = (newValue: string) => {
        dispatch(changeTodolistTitleAC(task.id, newValue))
    }

    return <div className={task.isDone ? "is-done" : ""}>
                    <Checkbox
                        checked={task.isDone}
                        color="primary"
                        onChange={onChangeHandler}
                    />

                    <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
                    <IconButton onClick={onClickHandler}>
                        <Delete/>
                    </IconButton>
                </div>

    /*return <div className={props.task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={props.task.isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
*/
})
export default TaskWithRedux;