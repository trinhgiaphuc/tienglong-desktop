import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signOut,
  signInWithEmailAndPassword,
  browserSessionPersistence
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAx-XZyVnFvhKglziQJZDtcxTDSllLAchU',
  authDomain: 'tienglong-34e90.firebaseapp.com',
  projectId: 'tienglong-34e90',
  storageBucket: 'tienglong-34e90.appspot.com',
  messagingSenderId: '1058256371735',
  appId: '1:1058256371735:web:7a56f279fe18e336949c52',
  measurementId: 'G-55Q6D2C4B5',
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();

auth.setPersistence(browserSessionPersistence);

export const facebookProvider = new FacebookAuthProvider();
export const googleProvider = new GoogleAuthProvider();

export async function handleSignOut() {
  try {
    await signOut(auth);
    window.electron.ipcRenderer.sendMessage('logout', [])
  } catch (error) {
    console.error(error);
  }
}

export async function signIn(email: string, password: string): Promise<void> {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
