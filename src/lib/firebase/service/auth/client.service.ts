import { getIdToken, onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { UserService } from '../user/user.service';
import { auth, googleProvider } from '../../client';
import { handleError } from '../../utils/errorHandler';

export const AuthClientService = {
  async signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const token = await getIdToken(user);

      const response = await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Falha ao criar sessão');
      }

      await UserService.createIfNotExists(user);
      return user;
    } catch (error) {
      handleError(error, 'Erro ao tentar autenticar com o Google');
    }
  },

  async logout() {
    try {
      await signOut(auth);

      const response = await fetch('/api/auth/session', {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Falha ao encerrar sessão');
      }

      return true;
    } catch (error) {
      handleError(error, 'Erro no logout');
    }
  },

  getCurrentUser(): Promise<User> {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(user);
        } else {
          reject(new Error('Nenhum usuário autenticado encontrado.'));
        }
        unsubscribe();
      });
    });
  },
};
