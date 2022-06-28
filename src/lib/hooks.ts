import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { UserDetails, StatusType } from '../typings';

export function useLogin() {
  const [user, setUser] = React.useState<UserDetails>(null);
  const [status, setStatus] = React.useState<StatusType>('unauthenticated');
  const navigate = useNavigate();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (userAuth) => {
        if (userAuth) {
          setStatus('loading');
          const token = await userAuth.getIdToken();
          window.electron.ipcRenderer.sendMessage('set-auth', [
            { token, id: userAuth.uid },
          ]);
          window.electron.ipcRenderer.sendMessage('get-userDetails', []);
        } else {
          setStatus('unauthenticated');
          navigate('/');
        }
      },
      (error: Error) => {
        console.error(error);
      }
    );
    return () => unsubscribe();
  }, []);

  return { user, setUser, status, setStatus };
}
