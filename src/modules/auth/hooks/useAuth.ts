'use client';
import { useState } from 'react';
import { AuthService } from '../service/auth.service';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);

    const { user, error } = await AuthService.signInWithGoogle();

    setLoading(false);
    if (error) {
      setError(error);
      return null;
    }
    return user;
  };

  return { loginWithGoogle, loading, error };
};
