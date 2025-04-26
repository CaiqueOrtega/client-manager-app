import { AuthSidePanel } from '../components/AuthSidePanel';
import { LoginForm } from '../components/LoginForm';

export default function LoginPage() {
  return (
    <>
      <AuthSidePanel />
      <div className="flex h-2/3 w-full flex-col items-center justify-center p-6 md:h-auto md:w-1/2 md:p-14">
        <header className="mb-10 w-full max-w-md text-center">
          <h2 className="mb-2 text-2xl font-bold text-teal-600 md:text-3xl">Bem-vindo de volta</h2>
          <p className="text-sm text-gray-500 md:text-base">
            Acesse sua conta agora mesmo e aproveite!
          </p>
        </header>
        <LoginForm />
      </div>
    </>
  );
}
