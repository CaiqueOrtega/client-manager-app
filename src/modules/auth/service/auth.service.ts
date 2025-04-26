import { auth } from '@/lib/firebase/client';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export const AuthService = {
  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      return {
        user: result.user,
        error: null,
      };
    } catch (error) {
      return {
        user: null,
        error: error as Error,
      };
    }
  },
};
