import { ReactNode } from 'react';
import { Navbar } from '../components/Navbar';
import { DashboardProvider } from '../context/DashboardProvider';
import { AuthProvider } from '../context/AuthProvider';

export const metadata = {
  title: 'Dashboard - ClientManager',
  description: 'Visualize informações e gerencie seus dados.',
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <DashboardProvider>
        <div className="flex h-screen flex-col bg-gray-50">
          <Navbar />

          <main className="flex-grow overflow-y-auto px-6 py-10 md:px-32">
            <div className="container mx-auto grid max-w-6xl grid-rows-[auto_1fr] gap-10">
              {children}
            </div>
          </main>
        </div>
      </DashboardProvider>
    </AuthProvider>
  );
}
