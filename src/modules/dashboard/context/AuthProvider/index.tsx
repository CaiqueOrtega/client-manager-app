'use client';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { AuthProviderType } from './types';
import { AuthClientService } from '@/lib/firebase/service/auth/browser';
import { User } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const AuthProviderContext = createContext<AuthProviderType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const currentUser = await AuthClientService.getCurrentAuth();
      setUser(currentUser);
    } catch (error) {
      setError((error as Error).message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await AuthClientService.logout();
    router.push('/login');
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthProviderContext.Provider value={{ user, loading, error, refreshUser: fetchUser, logout }}>
      {children}
    </AuthProviderContext.Provider>
  );
};

export const useAuthContext = (): AuthProviderType => {
  const context = useContext(AuthProviderContext);
  if (!context) {
    throw new Error('useAuthProvider deve ser usado dentro de um AuthProvider');
  }
  return context;
};
