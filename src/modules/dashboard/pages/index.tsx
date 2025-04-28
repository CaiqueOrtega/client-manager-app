'use client';
import { useModal } from '@/modules/shared/components/Modal/useModal';
import ClientTable from '../components/ClientTable';
import StatsCard from '../components/StatsCard';

import { FaPlus } from 'react-icons/fa6';
import ClientFormModal from '../components/ClientFormModal';

export default function DashboardPage() {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <div className="container mx-auto grid max-w-6xl grid-rows-[auto_1fr] gap-10">
        <StatsCard />
        <div className="space-y-12 rounded-2xl bg-white p-10 shadow-sm">
          <section className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-700">Controle de Clientes</h1>
              <h2 className="text-sm text-[#16C098]">Acompanhe seus clientes</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={openModal}
                className="flex h-10 w-10 items-center justify-center gap-2 rounded-2xl bg-teal-600 text-white transition-colors hover:bg-teal-700"
              >
                <FaPlus />
              </button>
            </div>
            <ClientTable />
          </section>
        </div>
      </div>
      <ClientFormModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
}
