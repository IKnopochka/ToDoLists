import {UserType} from 'types';
import { RootStateOrAny } from 'react-redux';

export const selectUsers = (state: RootStateOrAny): UserType[] => state.userData.users;
