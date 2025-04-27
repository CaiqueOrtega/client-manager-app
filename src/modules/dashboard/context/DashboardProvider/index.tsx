'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DashboardContextType, NavbarProps } from './types';

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [showDashboardInfo, setShowDashboardInfo] = useState<boolean>(true);

  const navbarProps: NavbarProps = {
    showDashboardInfo,
    setShowDashboardInfo,
  };

  return <DashboardContext.Provider value={{ navbarProps }}>{children}</DashboardContext.Provider>;
};

export const useDashboardContext = (): DashboardContextType => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboardContext deve ser usado dentro de um DashboardProvider');
  }
  return context;
};
