import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile
} from 'firebase/auth';
import { assertFirebaseConfigured, auth } from './firebase.js';

function mapUser(user) {
  if (!user) {
    return null;
  }

  return {
    id: user.uid,
    email: user.email,
    displayName: user.displayName || user.email?.split('@')[0] || 'User'
  };
}

export function getCurrentUser() {
  return mapUser(auth?.currentUser || null);
}

export function subscribeAuthStateChange(listener) {
  if (!auth) {
    listener(null);
    return () => {};
  }

  return onAuthStateChanged(auth, (user) => listener(mapUser(user)));
}

export async function signIn({ email, password }) {
  assertFirebaseConfigured();

  if (!email || !password) {
    throw new Error('Email and password are required.');
  }

  const credential = await signInWithEmailAndPassword(auth, email, password);
  return mapUser(credential.user);
}

export async function signUp({ fullName, email, password, confirmPassword }) {
  assertFirebaseConfigured();

  if (!fullName || !email || !password || !confirmPassword) {
    throw new Error('All fields are required.');
  }

  if (password !== confirmPassword) {
    throw new Error('Passwords do not match.');
  }

  const credential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(credential.user, { displayName: fullName });
  return mapUser({ ...credential.user, displayName: fullName });
}

export async function signOut() {
  assertFirebaseConfigured();
  await firebaseSignOut(auth);
}
