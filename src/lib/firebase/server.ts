import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from './config';

export const getFirebaseApp = () => {
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
};

export const getServerAuth = () => getAuth(getFirebaseApp());
export const getServerDb = () => getFirestore(getFirebaseApp());
