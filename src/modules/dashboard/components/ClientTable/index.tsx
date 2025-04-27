'use client';

import React from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { TableRow } from './types';
import { usePagination } from './components/Paginations/usePagination';
import Pagination from './components/Paginations';

const data: TableRow[] = Array.from({ length: 100 }, (_, i) => ({
  nome: `Loja ${i + 1}`,
  email: `contato@loja${i + 1}.com`,
  cnpj: `${String(i + 1).padStart(2, '0')}.${String(i + 1).padStart(3, '0')}.${String(i + 1).padStart(3, '0')}/0001-${String(i + 1).padStart(2, '0')}`,
  mensalidade: `R$ ${(i + 1) * 10},00`,
  status: i % 2 === 0 ? 'Ativo' : 'Inativo',
}));

export default function ClientTable() {
  const {
    currentItems,
    totalItems,
    itemsPerPage,
    currentPage,
    pageNumbers,
    goToPage,
    totalPages,
    itemsPerPageOptions,
    changeItemsPerPage,
  } = usePagination<TableRow>(data, 10);

  return (
    <div className="flex w-full flex-col gap-12 overflow-x-auto rounded-lg bg-white">
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
          {currentItems.map((row, idx) => (
            <tr key={idx} className="border-b border-gray-200 bg-white hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900">{row.nome}</td>
              <td className="px-6 py-4">{row.email}</td>
              <td className="px-6 py-4">{row.cnpj}</td>
              <td className="px-6 py-4">{row.mensalidade}</td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex w-20 items-center justify-center gap-2 rounded-lg p-1 text-xs ${
                    row.status === 'Ativo'
                      ? 'bg-teal-100/50 text-teal-400'
                      : 'bg-red-100/50 text-red-400'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      row.status === 'Ativo' ? 'bg-teal-300' : 'bg-red-300'
                    }`}
                  />
                  {row.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <button className="text-gray-500 hover:text-gray-700">
                  <HiDotsHorizontal size={20} />
                </button>
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
