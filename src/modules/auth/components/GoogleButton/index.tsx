'use client';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '@/modules/auth/hooks/useAuth';

export function GoogleButton() {
  const { signInWithGoogle, loading } = useAuth();

  return (
    <button
      type="button"
      onClick={signInWithGoogle}
      disabled={loading}
      className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-teal-600 transition hover:border-gray-300 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:border-gray-200 disabled:hover:bg-transparent"
    >
      <FcGoogle className="text-2xl" aria-hidden="true" />
      {loading ? 'Carregando...' : 'Ou entre com o Google'}
    </button>
  );
}
