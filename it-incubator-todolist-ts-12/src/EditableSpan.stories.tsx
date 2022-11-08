import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {EditableSpan} from "./EditableSpan";
import {action} from "@storybook/addon-actions";

export default {
  title: 'ToDoLists/EditableSpan',
  component: EditableSpan,
  argTypes: {
    onClick: {
      description: 'Button inside of form clicked'
    }
  },
} as ComponentMeta<typeof EditableSpan>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
EditableSpanStory.args = {
  onChange: action('Value changed'),
  value: 'rt'
}
;

