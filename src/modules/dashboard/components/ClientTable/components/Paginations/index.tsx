'use client';

import React from 'react';
import { PaginationProps } from './types';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  pageNumbers,
  totalPages,
  goToPage,
  itemsPerPageOptions,
  changeItemsPerPage,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-3">
      <div className="flex items-center gap-1 text-sm text-gray-600">
        <span>Exibindo</span>
        <select
          id="perPage"
          value={itemsPerPage}
          onChange={(e) => changeItemsPerPage(Number(e.target.value))}
          className="rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-700"
        >
          {itemsPerPageOptions.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <span>de {totalItems} resultados</span>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-lg border border-gray-300 px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          &lt;
        </button>

        {pageNumbers.map((p, i) =>
          p === 'dots' ? (
            <span key={`dots-${i}`} className="px-2 text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => goToPage(p)}
              className={`rounded-lg border px-3 py-1 text-sm ${
                p === currentPage
                  ? 'border-transparent bg-teal-600 text-white'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {p}
            </button>
          ),
        )}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-lg border border-gray-300 px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
