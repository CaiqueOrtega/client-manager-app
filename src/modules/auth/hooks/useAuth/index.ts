'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AuthClientService } from '@/lib/firebase/service/auth/client.service';
import { AuthState } from './types';

export function useAuth() {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    user: undefined,
    loading: false,
    error: null,
  });

  const setAuthStatus = (status: Partial<AuthState>) => {
    setAuthState((prev) => ({ ...prev, ...status }));
  };

  const signInWithGoogle = async () => {
    setAuthStatus({ loading: true, error: null });

    try {
      const user = await AuthClientService.signInWithGoogle();
      setAuthStatus({ user, loading: false });
      router.push('/dashboard');
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Erro desconhecido.');
      setAuthStatus({ user: undefined, loading: false, error });
      throw error;
    }
  };

  return {
    ...authState,
    signInWithGoogle,
  };
}
