import * as React from 'react';
import { StatusType, useLogin, UserData } from './hooks';

type PropsType = {
  children: React.ReactNode;
};

type UserContextType = {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData>>;
  status: StatusType;
  setStatus: React.Dispatch<React.SetStateAction<StatusType>>;
};

const UserContext = React.createContext<UserContextType>({
  user: null,
  setUser: null,
  status: 'unauthenticated',
  setStatus: null,
});

export function useUser() {
  return React.useContext(UserContext);
}

export default function UserProvider({ children }: PropsType) {
  UserContext.displayName = 'User Context';
  return (
    <UserContext.Provider value={useLogin()}>{children}</UserContext.Provider>
  );
}
