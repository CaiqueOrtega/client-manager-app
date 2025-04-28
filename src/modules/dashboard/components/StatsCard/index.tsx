import React from 'react';
import { FaUsers } from 'react-icons/fa';
import { FaChartPie, FaClockRotateLeft } from 'react-icons/fa6';
import { useDashboardContext } from '../../context/DashboardProvider';
import Card from './components/Card';
import { useClientStats } from './useClientStats';

export default function StatsCard() {
  const {
    navbarProps: { showDashboardInfo },
    clients,
    loadingClients,
  } = useDashboardContext();

  const stats = useClientStats(clients);

  return (
    showDashboardInfo && (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card
          title="Total de Clientes"
          value={stats.totalClients.toString()}
          icon={<FaUsers size={26} className="text-purple-600" />}
          iconColor="bg-purple-100"
          backgroundColor="bg-purple-100"
          loading={loadingClients}
        />
        <Card
          title="Total de Mensalidades"
          value={`R$${stats.totalSubscriptionFee.toLocaleString()}`}
          icon={<FaChartPie size={26} className="text-green-600" />}
          iconColor="bg-green-100"
          backgroundColor="bg-green-100"
          loading={loadingClients}
        />
        <Card
          title="Clientes Inativos"
          value={stats.totalInactiveClients.toString()}
          icon={<FaClockRotateLeft size={22} className="text-orange-600" />}
          iconColor="bg-orange-100"
          backgroundColor="bg-orange-100"
          loading={loadingClients}
        />
      </div>
    )
  );
}
