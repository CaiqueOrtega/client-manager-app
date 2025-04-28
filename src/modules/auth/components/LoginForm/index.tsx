'use client';
import InputWithIcon from '@/modules/shared/components/InputWithIcon';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { GoogleButton } from '../GoogleButton';
import { useAuth } from '../../hooks/useAuth';

export function LoginForm() {
  const { signInWithGoogle, loading, error } = useAuth();

  return (
    <form className="flex w-full max-w-md flex-col gap-5">
      <InputWithIcon id="email" type="email" placeholder="Endereço de E-mail" icon={FaEnvelope} />
      <InputWithIcon id="password" type="password" placeholder="Senha" icon={FaLock} />

      <label htmlFor="remember" className="flex items-center text-sm text-gray-500">
        <input id="remember" type="checkbox" className="mr-2 accent-teal-600" defaultChecked />
        Manter-me conectado
      </label>

      {error && <span className="text-red-400">{error.message}</span>}
      <div className="mt-6 flex flex-col gap-2">
        <button
          type="submit"
          className={`w-full cursor-pointer rounded-xl bg-teal-600 py-3 font-medium text-white transition hover:bg-teal-700 disabled:opacity-60`}
        >
          Entrar
        </button>
        <GoogleButton signInWithGoogle={signInWithGoogle} loading={loading} />
      </div>
    </form>
  );
}
