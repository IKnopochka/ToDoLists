import React from 'react';
import {DataStateType} from "../../dataState/dataState";
import {useParams} from "react-router-dom";

export const Page = (props: DataStateType) => {
    const param = useParams()
    console.log(Number(param.id))
    return (
        <div>
            <div>{props.pages[Number(param.id)].heading}</div>
            <div>{props.pages[Number(param.id)].about}</div>
        </div>
    );
};
