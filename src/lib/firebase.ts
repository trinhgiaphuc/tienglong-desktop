import { getApps, initializeApp } from "firebase/app";
import {
  browserSessionPersistence,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAx-XZyVnFvhKglziQJZDtcxTDSllLAchU",
  authDomain: "tienglong-34e90.firebaseapp.com",
  projectId: "tienglong-34e90",
  storageBucket: "tienglong-34e90.appspot.com",
  messagingSenderId: "1058256371735",
  appId: "1:1058256371735:web:7a56f279fe18e336949c52",
  measurementId: "G-55Q6D2C4B5",
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

export const auth = getAuth();

// Make user auth available only 1 session
auth.setPersistence(browserSessionPersistence);

export const db = getFirestore();
export const storage = getStorage();

export const facebookProvider = new FacebookAuthProvider();
export const googleProvider = new GoogleAuthProvider();

export async function signIn(email: string, password: string): Promise<void> {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function handleSignOut() {
  try {
    await signOut(auth);

    // Clear Cookie
    window.electron.ipcRenderer.sendMessage("logout", []);
  } catch (error) {
    console.error(error);
  }
}
