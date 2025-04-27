'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation'; // 👈 importa o useRouter
import { AuthClientService } from '@/lib/firebase/service/auth/client.service';
import { User } from 'firebase/auth';

export function useAuthUser() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // 👈 instancia o router

  const fetchUser = useCallback(async () => {
    setError(null);
    try {
      const currentUser = await AuthClientService.getCurrentUser();
      setUser(currentUser);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Erro desconhecido');
      setUser(null);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleLogout = useCallback(async () => {
    setError(null);
    try {
      await AuthClientService.logout();
      router.push('/login');
      setUser(null);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Erro desconhecido');
    }
  }, [router]);

  return {
    user,
    error,
    handleLogout,
  };
}
