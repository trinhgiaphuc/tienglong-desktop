import * as React from 'react';
import { StatusType, UserDetails } from '../typings';
import { useLogin } from './hooks';

type UserContextType = {
  user: UserDetails | null;
  setUser: React.Dispatch<React.SetStateAction<UserDetails>>;
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

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  UserContext.displayName = 'User Context';
  return (
    <UserContext.Provider value={useLogin()}>{children}</UserContext.Provider>
  );
}
