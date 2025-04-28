import { Client, Status } from '@/lib/firebase/service/client/browser/types';
import { useMemo } from 'react';

interface ClientStats {
  totalClients: number;
  totalSubscriptionFee: number;
  totalInactiveClients: number;
}

export function useClientStats(clients: Client[]): ClientStats {
  const stats = useMemo(() => {
    const totalClients = clients.length;

    const totalSubscriptionFee = clients.reduce((acc, client) => {
      return acc + client.subscriptionFee;
    }, 0);

    const totalInactiveClients = clients.filter(
      (client) => client.status === Status.INACTIVE,
    ).length;

    return {
      totalClients,
      totalSubscriptionFee,
      totalInactiveClients,
    };
  }, [clients]);

  return stats;
}
