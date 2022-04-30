import React from 'react';

type UpdateItemPropsType = {
    title: string
}

export const UpdateItem = (props: UpdateItemPropsType) => {
    return (
            <span>{props.title}</span>
    );
};

