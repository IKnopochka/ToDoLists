import React from 'react';
import {DataStateType} from "../../dataState/dataState";
import {useParams} from "react-router-dom";
import {Error404} from "./Error404";

export const Page = (props: DataStateType) => {
    const param = useParams()

    if (Number(param.id) > 2) return <Error404/>

    return (
        <div>

            <div>{props.pages[Number(param.id)].heading}</div>
            <div>{props.pages[Number(param.id)].about}</div>
        </div>
    );
};
