import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';
import * as React from 'react';

export function useLogin() {
  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  return { user, setUser };
}
