import { getIdToken, signInWithPopup } from 'firebase/auth';
import { UserService } from '../user/user.service';
import { auth, googleProvider } from '../../client';

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
      console.error('Erro:', error);
      throw error;
    }
  },
};
