import { AuthClientService } from '@/lib/firebase/service/auth/client.service';
import { useState } from 'react';
import { AuthState } from './types';

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: false,
    error: null,
  });

  const signInWithGoogle = async () => {
    setAuthState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const user = await AuthClientService.signInWithGoogle();
      setAuthState({ user, loading: false, error: null });
      return user;
    } catch (error) {
      const authError = error instanceof Error ? error : new Error('Unknown error');
      setAuthState({
        user: null,
        loading: false,
        error: authError,
      });
      throw authError;
    }
  };

  return {
    ...authState,
    signInWithGoogle,
  };
}
