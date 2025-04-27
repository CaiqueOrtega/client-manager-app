import { Dispatch, SetStateAction } from 'react';

export type NavbarProps = {
  showDashboardInfo: boolean;
  setShowDashboardInfo: Dispatch<SetStateAction<boolean>>;
};

export type DashboardContextType = {
  navbarProps: NavbarProps;
};
