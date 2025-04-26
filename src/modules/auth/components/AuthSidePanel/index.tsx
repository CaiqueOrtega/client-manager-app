import { TbSettings2 } from 'react-icons/tb';

export function AuthSidePanel() {
  return (
    <aside className="flex h-1/3 w-full flex-col items-center justify-center rounded-b-4xl bg-teal-600 p-10 text-center text-white md:h-auto md:w-1/2 md:rounded-r-4xl">
      <div className="flex items-center gap-2 text-3xl">
        <TbSettings2 aria-hidden="true" />
        <h1 className="font-bold">ClientManager</h1>
      </div>
      <p className="mt-2 mb-6 text-gray-300">Organize e acompanhe seus clientes em um só lugar</p>
    </aside>
  );
}
