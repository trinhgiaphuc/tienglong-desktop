import { User } from 'firebase/auth';
import * as React from 'react';
import { useLogin } from './hooks';

type PropsType = {
  children: React.ReactNode;
};

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

const UserContext = React.createContext<UserContextType>({
  user: null,
  setUser: null,
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
