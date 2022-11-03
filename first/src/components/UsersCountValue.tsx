import React, {memo} from 'react';

type PropsType = {
  usersCount: number;
};

export const UsersCountValue: React.FC<PropsType> = memo(({usersCount}) => {

  return <span>Users count: {usersCount}</span>;
});
