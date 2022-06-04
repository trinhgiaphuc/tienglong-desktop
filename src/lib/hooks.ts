import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const [user, setUser] = React.useState<User>();
  const navigate = useNavigate();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
        setUser(user)
      if (user) {
        navigate('/main_window')
      } else {
        navigate('/')
      }
    });
    return () => unsubscribe();
  }, []);

  return { user, setUser };
}
