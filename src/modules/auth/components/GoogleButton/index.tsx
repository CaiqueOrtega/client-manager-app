import { FcGoogle } from 'react-icons/fc';

export function GoogleButton() {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-teal-600 transition hover:border-gray-300 hover:bg-gray-200 disabled:opacity-60"
    >
      <FcGoogle className="text-2xl" aria-hidden="true" />
      Ou entre com o Google
    </button>
  );
}
