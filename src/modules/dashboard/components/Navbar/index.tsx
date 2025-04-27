'use client';
import { TbSettings2 } from 'react-icons/tb';
import { UserMenu } from './components/UserMenu';

export function Navbar() {
  return (
    <nav className="w-full rounded-b-full bg-teal-600 px-6 py-4 text-white shadow-md md:px-38">
      <div className="container mx-auto flex max-w-6xl items-center justify-between">
        <div className="flex items-center gap-2 text-2xl">
          <TbSettings2 />
          <h1 className="font-bold">ClientManager</h1>
        </div>

        <UserMenu />
      </div>
    </nav>
  );
}
