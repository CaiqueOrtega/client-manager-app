import { useState, useMemo } from 'react';

export function usePagination<T>(items: T[], initialPerPage: number = 5) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialPerPage);

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const pageNumbers = useMemo(() => {
    const pagesPerSet = 5;
    const currentSet = Math.ceil(currentPage / pagesPerSet);
    const start = (currentSet - 1) * pagesPerSet + 1;
    const end = Math.min(start + pagesPerSet - 1, totalPages);

    const numbers: (number | 'dots')[] = [];

    if (start > 1) {
      numbers.push(1);
      if (start > 2) numbers.push('dots');
    }

    for (let i = start; i <= end; i++) numbers.push(i);

    if (end < totalPages) {
      if (end < totalPages - 1) numbers.push('dots');
      numbers.push(totalPages);
    }

    return numbers;
  }, [currentPage, totalPages]);

  const itemsPerPageOptions = useMemo(() => {
    const options: number[] = [];
    let value = 5;
    let step = 5;

    while (value < totalItems && options.length < 9) {
      options.push(value);

      if (options.length === 4) step = 10;
      if (options.length === 7) step = 25;

      value += step;
    }

    if (options.length < 10 && !options.includes(totalItems)) {
      options.push(totalItems);
    }

    return options;
  }, [totalItems]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const changeItemsPerPage = (perPage: number) => {
    setItemsPerPage(perPage);
    setCurrentPage(1);
  };

  return {
    currentItems,
    totalItems,
    itemsPerPage,
    itemsPerPageOptions,
    currentPage,
    pageNumbers,
    goToPage,
    totalPages,
    changeItemsPerPage,
  };
}
