import {TaskType} from "../Todolist";
import {v1} from "uuid";

type toDoListReducerType = removeTaskACType | addTaskACType

export const toDoListReducer = (state: Array<TaskType>, action: toDoListReducerType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            /*let filteredTasks = tasks.filter(t => t.id != id);
       setTasks(filteredTasks);*/
            return state.filter(f => f.id !== action.payload.id)
        }
        case 'ADD-TASK': {
            /*let task = { id: v1(), title: title, isDone: false };
            let newTasks = [task, ...tasks];*/
            return [{ id: v1(), title: action.payload.title, isDone: false }, ...state]
        }

        default:
            return state
    }
}

type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>


export const removeTaskAC = (id: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            id
        }
    } as const
}
export const addTaskAC = (title: string) => {
    return {
        type: "ADD-TASK",
        payload: {title}
    } as const
}
