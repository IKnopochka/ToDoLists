import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectUsers, selectUsersCount} from 'store/selectors';
import {createUser, plusUserCount} from 'store/actions';
import {v1} from 'uuid';
import {CustomButton, UsersCountValue} from 'components';
import {UsersList} from 'components/UsersList';
import {generateRandomName} from 'utils';
import {SetTimeoutType, UserType} from 'types';
import {RootStoreType} from "./store";

const DELAY = 500;

export const App = () => {
    const dispatch = useDispatch();

    const users = useSelector<RootStoreType, UserType[]>(selectUsers);
    const usersCount = useSelector<RootStoreType, number>(selectUsersCount);
    const [isAddNewUser, setIsAddNewUser] = useState<boolean>(false);

    const handleClick = useCallback(() => { //void

        dispatch(createUser({id: v1(), name: generateRandomName()}));
        dispatch(plusUserCount());

        setIsAddNewUser(true);

        setTimeout(() => { //void
            setIsAddNewUser(false);
        }, DELAY);

    }, [dispatch]);

    return (
        //<Fragment>
        <Fragment>
            <UsersCountValue usersCount={usersCount}/>

            <CustomButton
                title="Click Me"
                isButtonDisabled={isAddNewUser}
                onClick={handleClick}
            />

            <UsersList users={users}/>
        </Fragment>
    );
};


/*useEffect(() => {
if (users.length > 0 && isAddNewUser) {
dispatch(plusUserCount());
}
}, [dispatch, users.length, isAddNewUser]);*/

/*
useEffect(() => {

    let timeoutId: SetTimeoutType = setTimeout(() => { //void
        setIsAddNewUser(true);
    }, DELAY);

    return () => {
        clearTimeout(timeoutId)
        setIsAddNewUser(false)
    };
}, [DELAY]);*/
