'use client';
import ClientTable from '../components/ClientTable';
import StatsCard from '../components/StatsCard';

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
          <ClientTable />
        </section>
      </div>
    </div>
  );
}
