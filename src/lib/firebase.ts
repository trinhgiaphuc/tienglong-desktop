import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  AuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// import fetcher from './fetcher';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();

export const facebookProvider = new FacebookAuthProvider();
export const googleProvider = new GoogleAuthProvider();

// AUTHENTICATION
/**
 * `handle sign in with provider`
 * @param  {AuthProvider} provider
 */
export async function handleSignIn(provider: AuthProvider) {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error(error);
  }
}

export async function handleSignInWithRedirect(provider: AuthProvider) {
  await signInWithRedirect(auth, provider);
  const result = await getRedirectResult(auth);
  if (result) {
    const user = result.user;
    console.log(user);
    FacebookAuthProvider.credentialFromResult(result);
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    console.log(token);
  }
}

export async function handleSignOut() {
  try {
    // await fetcher('enter', { logout: true });
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
}
