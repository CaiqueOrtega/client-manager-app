import { signInWithPopup } from 'firebase/auth';
import { UserService } from './user.service';
import { auth, googleProvider } from '../client';

export const AuthService = {
  async signInWithGoogle() {
    const result = await signInWithPopup(auth, googleProvider);

    await new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          unsubscribe();
          resolve(user);
        } else {
          console.log('⚠️ Nenhum usuário autenticado');
        }
      });
    });

    await UserService.createIfNotExists(result.user);

    return result.user;
  },
};
