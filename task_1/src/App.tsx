import {Fragment} from 'react';
import {Example_1} from "./examples/example_1/Example_1";

export type UserType = {
  [key: string]: { name: string, id: string }
};

const DATA_7: UserType[] = [
  {u1: {name: 'Gleb', id: '1'}},
  {u2: {name: 'Dima', id: '2'}},
  {u3: {name: 'Svetlana', id: '3'}},
  {u4: {name: 'Artur', id: '4'}},
  {u5: {name: 'Vera', id: '5'}},
  {u6: {name: 'Vlad', id: '6'}},
];

export const App = () => {

  console.log('App rendering')

  return (
    <Fragment>
      <Example_1 />
    </Fragment>
  );
};
