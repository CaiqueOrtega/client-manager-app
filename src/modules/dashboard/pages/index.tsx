'use client';
import InputWithIcon from '@/modules/shared/components/InputWithIcon';
import ClientTable from '../components/ClientTable';
import StatsCard from '../components/StatsCard';
import { FiSearch } from 'react-icons/fi';
import { FaPlus } from 'react-icons/fa';

export default function DashboardPage() {
  return (
    <div className="container mx-auto grid max-w-6xl grid-rows-[auto_1fr] gap-10">
      <StatsCard />
      <div className="space-y-12 rounded-2xl bg-white p-10 shadow-sm">
        <section className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-700">Controle de Clientes</h1>
            <h2 className="text-sm text-[#16C098]">Acompanhe seus clientes</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="w-60">
              <InputWithIcon
                id="search"
                type="text"
                placeholder="Buscar cliente"
                icon={FiSearch}
                rounded="rounded-2xl"
                borderColor="border-gray-300"
                bgColor="bg-white"
                iconColor="text-gray-500"
                paddingY="py-2"
                paddingX="pl-12 pr-3"
              />
            </div>
            <button className="flex h-10 w-10 items-center justify-center gap-2 rounded-2xl bg-teal-600 text-white transition-colors hover:bg-teal-700">
              <FaPlus />
            </button>
          </div>
          <ClientTable />
        </section>
      </div>
    </div>
  );
}
