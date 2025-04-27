import { FaUsers } from 'react-icons/fa';
import { FaChartPie, FaClockRotateLeft } from 'react-icons/fa6';
import { useDashboardContext } from '../../context/DashboardProvider';
import Card from './components/Card';

export default function StatsCard() {
  const {
    navbarProps: { showDashboardInfo },
  } = useDashboardContext();

  return (
    showDashboardInfo && (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card
          title="Total de Clientes"
          value="256"
          percentage="8.5% desde ontem"
          icon={<FaUsers size={26} className="text-purple-600" />}
          iconColor="bg-purple-100"
          backgroundColor="bg-purple-100"
        />
        <Card
          title="Total de Mensalidades"
          value="R$89.000"
          percentage="4.3% desde ontem"
          icon={<FaChartPie size={26} className="text-green-600" />}
          iconColor="bg-green-100"
          backgroundColor="bg-green-100"
        />
        <Card
          title="Clientes Pendentes"
          value="89"
          percentage="-1.8% desde ontem"
          icon={<FaClockRotateLeft size={22} className="text-orange-600" />}
          iconColor="bg-orange-100"
          backgroundColor="bg-orange-100"
        />
      </div>
    )
  );
}
