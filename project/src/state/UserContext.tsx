import React, {createContext, useReducer} from 'react';
// import {IUser} from '../ts/interfaces';

interface IUser {
  fullname: string;
  email: string;
}

export interface IUserState {
  user: IUser | null;
}

const initialState: IUserState = {user: null};

export type TUserAction =
  | {
      type: 'UPDATE_USER';
      payload: {
        email: string;
        fullname: string;
      };
    }
  | {type: 'LOGOUT_USER'};

export const UserContext = createContext<{
  state: typeof initialState;
  dispatch: React.Dispatch<TUserAction>;
}>({
  state: initialState,
  dispatch: () => {},
});

const reducer = (state: typeof initialState, action: TUserAction) => {
  switch (action.type) {
    case 'UPDATE_USER':
      const loggedUser = {...action.payload};
      return {
        user: loggedUser,
      };
    case 'LOGOUT_USER':
      return {user: null};
    default:
      return state;
  }
};

interface IUserProviderProps {
  children: React.ReactNode;
}

const UserProvider = ({children}: IUserProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{state, dispatch}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
