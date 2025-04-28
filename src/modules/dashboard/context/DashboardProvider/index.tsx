'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import { DashboardContextType, NavbarProps } from './types';
import { Client, Status } from '@/lib/firebase/service/client/browser/types';
import { ClientService } from '@/lib/firebase/service/client/browser';
import { useAuthContext } from '@/modules/dashboard/context/AuthProvider';

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [showDashboardInfo, setShowDashboardInfo] = useState<boolean>(true);
  const [clients, setClients] = useState<Client[]>([]);
  const [loadingClients, setLoadingClients] = useState<boolean>(true);

  const { user, loading: userLoading } = useAuthContext();

  const getClients = useCallback(async (): Promise<Client[]> => {
    if (!user?.uid) {
      throw new Error('Usuário não autenticado.');
    }

    const clients = await ClientService.getClients(user.uid);
    return clients;
  }, [user?.uid]);

  const addClient = (newClient: Client) => {
    setClients((prevClients) => [...prevClients, newClient]);
  };

  const updateClientStatus = (clientId: string, status: Status) => {
    setClients((prevClients) =>
      prevClients.map((client) => (client.id === clientId ? { ...client, status } : client)),
    );
  };

  const removeClient = (clientId: string) => {
    setClients((prevClients) => prevClients.filter((client) => client.id !== clientId));
  };

  useEffect(() => {
    const fetchClients = async () => {
      if (userLoading) return;
      if (!user) {
        setClients([]);
        setLoadingClients(false);
        return;
      }

      try {
        setLoadingClients(true);
        const clientsList = await getClients();
        setClients(clientsList);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      } finally {
        setLoadingClients(false);
      }
    };
    fetchClients();
  }, [user, userLoading, getClients]);

  const navbarProps: NavbarProps = {
    showDashboardInfo,
    setShowDashboardInfo,
  };

  return (
    <DashboardContext.Provider
      value={{
        navbarProps,
        clients,
        loadingClients,
        addClient,
        updateClientStatus,
        removeClient,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = (): DashboardContextType => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboardContext deve ser usado dentro de um DashboardProvider');
  }
  return context;
};
