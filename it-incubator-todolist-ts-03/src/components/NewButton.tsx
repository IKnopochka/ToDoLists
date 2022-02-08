import React from "react";

type propsType = {
    name: string
    callback: () => void
}

export const NewButton = ({name, callback}: propsType) => {
    return (
        <div>
            <button onClick={callback}>{name}</button>
        </div>
    )

}