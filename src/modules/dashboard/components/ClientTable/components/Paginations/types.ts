export type PaginationProps = {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  pageNumbers: (number | 'dots')[];
  totalPages: number;
  goToPage: (page: number) => void;
  itemsPerPageOptions: number[];
  changeItemsPerPage: (perPage: number) => void;
};
