import { Dispatch, SetStateAction } from 'react';
import { Client, Status } from '@/lib/firebase/service/client/browser/types';

export type NavbarProps = {
  showDashboardInfo: boolean;
  setShowDashboardInfo: Dispatch<SetStateAction<boolean>>;
};

export type DashboardContextType = {
  navbarProps: NavbarProps;
  clients: Client[];
  loadingClients: boolean;
  addClient: (newClient: Client) => void;
  updateClientStatus: (clientId: string, status: Status) => void;
  removeClient: (clientId: string) => void;
};
