import { ClientService } from '@/lib/firebase/service/client/browser';
import { Status } from '@/lib/firebase/service/client/browser/types';
import { handleError } from '@/lib/firebase/utils/errorHandler';
import { useState } from 'react';
import { useDashboardContext } from '@/modules/dashboard/context/DashboardProvider';

export function useActionMenu() {
  const [loading, setLoading] = useState(false);
  const { updateClientStatus, removeClient } = useDashboardContext();

  const handleUpdateStatus = async (clientId: string, currentStatus: Status) => {
    setLoading(true);
    try {
      const newStatus = currentStatus === Status.ACTIVE ? Status.INACTIVE : Status.ACTIVE;
      await ClientService.updateClientStatus(clientId, newStatus);

      updateClientStatus(clientId, newStatus);
    } catch (err) {
      handleError(err, 'Erro ao atualizar status');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClient = async (clientId: string) => {
    setLoading(true);
    try {
      await ClientService.deleteClient(clientId);

      removeClient(clientId);
    } catch (err) {
      handleError(err, 'Erro ao excluir cliente');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleUpdateStatus,
    handleDeleteClient,
  };
}
