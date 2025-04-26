import { User } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../client';

export const UserService = {
  async createIfNotExists(user: User) {
    const userRef = doc(db, 'users', user.uid);
    console.log('Verificando se o usuário existe no Firestore:', userRef.path);

    const snapshot = await getDoc(userRef);
    if (!snapshot.exists()) {
      console.log('Usuário não existe. Criando novo usuário...');
      try {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName ?? '',
          photoURL: user.photoURL ?? '',
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
        });
        console.log('Usuário criado com sucesso!');
      } catch (error) {
        console.error('Erro ao criar documento no Firestore:', error);
      }
    } else {
      console.log('Usuário já existe no Firestore.');
    }
  },
};
