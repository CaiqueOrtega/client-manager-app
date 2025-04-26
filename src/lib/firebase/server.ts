import { getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { firebaseServerConfig } from './config';

export const getFirebaseServerApp = () => {
  if (getApps().length === 0) {
    return initializeApp(firebaseServerConfig);
  }
  return getApps()[0];
};

export const auth = getAuth(getFirebaseServerApp());
