import { User } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../client';

export const UserService = {
  async createIfNotExists(user: User) {
    const userRef = doc(db, 'users', user.uid);

    const snapshot = await getDoc(userRef);
    if (!snapshot.exists()) {
      try {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName ?? '',
          photoURL: user.photoURL ?? '',
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
        });
      } catch (error) {
        console.error('Erro ao criar documento no Firestore:', error);
      }
    } else {
      console.log('Usuário já existe no Firestore.');
    }
  },
};
