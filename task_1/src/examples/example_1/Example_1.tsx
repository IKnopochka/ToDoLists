import {ChangeEvent, FC, memo, useCallback, useEffect, useMemo, useState} from 'react';

const CONTAINER_STYLES = {display: 'flex', flexDirection: 'column', gap: 10};

type PropsType = { value: string, onChange: (e: ChangeEvent<HTMLInputElement>) => void };

// Task 1
// If change value on input Title component not re-render
// If change value on input Example_1 component not re-render

export const Example_1 = () => {
    console.log('Example1 rendering')

    return (
        <div style={{...CONTAINER_STYLES} as any}>
            <Input/>
            <Title title="I am a title"/>
        </div>
    );
};

const Title = memo((props: { title: string }) => {
    console.log('Title rendering')
    return <h3>{props.title}</h3>
});

const Input = () => {
        console.log('input rendering')

        const [value, setValue] = useState('');

        const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            setValue(e.currentTarget.value);
        }, [value]);

        return (
            <input type="text" placeholder="Placeholder" value={value} onChange={handleChange}/>
        );
    }
;
