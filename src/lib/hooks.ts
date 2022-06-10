import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Word } from '../typings';

export type StatusType = 'loading' | 'authenticated' | 'unauthenticated';

export type UserData = {
  userDetails: {
  createdAt: {_seconds: number, _nanoseconds: number}
  email: string
  hashedPass: string
  hearts: number
  id: string
  image: string
  role: string[]
  updatedAt: {_seconds: number, _nanoseconds: number}
  username: string
  words: number
  }
  userWords: Word[]
}

export function useLogin() {
  const [user, setUser] = React.useState<UserData>(null);
  const [status, setStatus] = React.useState<StatusType>('unauthenticated');
  const navigate = useNavigate();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        if (user) {
          const token = await user.getIdToken().catch(console.error);
        window.electron.ipcRenderer.sendMessage('set-auth', [{ token, uid:user.uid }]);
        navigate('/main_window');
        setStatus('loading');
        }
        else {
          setStatus('unauthenticated');
          navigate('/')
        }
      },
      (error: Error) => {
        console.error(error);
      }
    );
    return () => unsubscribe();
  }, []);

  return { user, setUser, status,setStatus };
}
