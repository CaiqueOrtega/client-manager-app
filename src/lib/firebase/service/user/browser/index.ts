import { db } from '@/lib/firebase/config/browser';
import { handleError } from '@/lib/firebase/utils/errorHandler';
import { User } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

export const UserService = {
  async createIfNotExists(user: User) {
    try {
      const userRef = doc(db, 'users', user.uid);
      const snapshot = await getDoc(userRef);

      if (!snapshot.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName ?? '',
          photoURL: user.photoURL ?? '',
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
        });
      }
    } catch (error) {
      handleError(error, 'Não foi possível criar o documento do usuário.');
    }
  },
};
