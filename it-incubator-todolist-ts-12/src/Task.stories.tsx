import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Task} from "./Task";
import {TaskType} from "./Todolist";
import {action} from "@storybook/addon-actions";

export default {
    title: 'ToDoLists/Task',
    component: Task,
    args: {
        changeTaskStatus: action('status Changed'),
        changeTaskTitle: action('title Changed'),
        removeTask: action('task removed'),
        todolistId: 'qwerty'
    }
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDone = Template.bind({});
TaskIsDone.args = {
    task: {id: 'x', isDone: true, title: "JS"},

};

export const TaskIsNotDone = Template.bind({});
TaskIsNotDone.args = {
    task: {id: 'x', isDone: false, title: "JS"},
};
