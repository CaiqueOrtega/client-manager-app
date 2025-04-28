'use client';

import React from 'react';
import { Plans, Status } from '@/lib/firebase/service/client/browser/types';
import { MdBackupTable } from 'react-icons/md';
import { useDashboardContext } from '../../context/DashboardProvider';
import { usePagination } from './components/Paginations/usePagination';
import Pagination from './components/Paginations';
import { ActionMenu } from './components/ActionMenu';

export default function ClientTable() {
  const { clients, loadingClients } = useDashboardContext();

  const {
    currentItems,
    totalItems,
    itemsPerPage,
    pageNumbers,
    currentPage,
    totalPages,
    goToPage,
    itemsPerPageOptions,
    changeItemsPerPage,
  } = usePagination(clients);

  if (loadingClients) {
    return (
      <div className="flex w-full items-center justify-center py-12">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-gray-100 border-t-teal-600" />
      </div>
    );
  }

  if (clients.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-2 py-20">
        <MdBackupTable size={100} className="text-gray-200" />
        <div className="text-center">
          <h2 className="m-0 text-xl font-semibold text-gray-400">Nenhum cliente cadastrado</h2>
          <p className="m-0 text-sm text-gray-300">
            Cadastre um cliente para começar a listá-los aqui.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-12 rounded-lg bg-white">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-gray-200 text-xs text-gray-400 uppercase">
          <tr>
            <th className="px-6 py-3">Nome</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">CNPJ</th>
            <th className="px-6 py-3">Mensalidade</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Ação</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((client) => (
            <tr key={client.id} className="border-b border-gray-200 bg-white hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900">{client.name}</td>
              <td className="px-6 py-4">{client.email}</td>
              <td className="px-6 py-4">{client.cnpj}</td>
              <td className="px-6 py-4">{formatPlan(client.subscriptionFee)}</td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex w-20 items-center justify-center gap-2 rounded-lg p-1 text-xs ${
                    client.status === Status.ACTIVE
                      ? 'bg-teal-100/50 text-teal-400'
                      : 'bg-red-100/50 text-red-400'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      client.status === Status.ACTIVE ? 'bg-teal-300' : 'bg-red-300'
                    }`}
                  />
                  {client.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <ActionMenu clientId={client.id} currentStatus={client.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        pageNumbers={pageNumbers}
        totalPages={totalPages}
        goToPage={goToPage}
        itemsPerPageOptions={itemsPerPageOptions}
        changeItemsPerPage={changeItemsPerPage}
      />
    </div>
  );
}

function formatPlan(plan: Plans) {
  switch (plan) {
    case Plans.BASIC:
      return 'Plano Básico - R$99';
    case Plans.INTERMEDIATE:
      return 'Plano Intermediário - R$199';
    case Plans.ADVANCED:
      return 'Plano Avançado - R$299';
    default:
      return 'Plano Desconhecido';
  }
}
