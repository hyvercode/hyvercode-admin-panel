import React from 'react';
import Button from './Button';

export interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  sortKey?: keyof T;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  sortConfig?: { key: keyof T; direction: 'ascending' | 'descending' };
  onSort?: (key: keyof T) => void;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  emptyState?: React.ReactNode;
}

const generatePagination = (currentPage: number, totalPages: number): (number | string)[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, '...', totalPages];
  }
  if (currentPage > totalPages - 4) {
    return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }
  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
};

function Table<T extends { id: number | string } & Record<string, any>>({
  columns,
  data,
  sortConfig,
  onSort,
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
  emptyState
}: TableProps<T>) {

  const getSortIcon = (key?: keyof T) => {
    if (!onSort || !sortConfig || sortConfig.key !== key) {
      return <i className="bi bi-arrow-down-up ml-2 text-neutral-400"></i>;
    }
    if (sortConfig.direction === 'ascending') {
      return <i className="bi bi-sort-up ml-2 text-primary"></i>;
    }
    return <i className="bi bi-sort-down ml-2 text-primary"></i>;
  };
  
  const paginationNumbers = generatePagination(currentPage, totalPages);

  return (
    <div className="bg-neutral-0 dark:bg-neutral-1000 rounded-lg shadow-sm overflow-hidden border border-neutral-200 dark:border-neutral-900">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-neutral-600 dark:text-neutral-400">
          <thead className="text-xs text-neutral-800 uppercase bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-300">
            <tr>
              {columns.map((col, index) => (
                <th key={index} scope="col" className="px-6 py-3 font-medium">
                  {col.sortKey && onSort ? (
                    <button onClick={() => onSort(col.sortKey!)} className="flex items-center hover:text-neutral-900 dark:hover:text-white">
                      {col.header} {getSortIcon(col.sortKey)}
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? data.map((item) => (
              <tr key={item.id} className="bg-neutral-0 dark:bg-neutral-1000 border-b dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900">
                {columns.map((col, index) => (
                  <td key={index} className="px-6 py-4">
                    {typeof col.accessor === 'function'
                      ? col.accessor(item)
                      : item[col.accessor]
                    }
                  </td>
                ))}
              </tr>
            )) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-8 px-6">
                  {emptyState || 'No data available.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
         <div className="flex justify-between items-center px-6 py-3 bg-neutral-100 dark:bg-neutral-900/50 border-t dark:border-neutral-800">
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Page <span className="font-semibold">{currentPage}</span> of <span className="font-semibold">{totalPages}</span>
            </span>
           <div className="inline-flex items-center -space-x-px">
              <Button 
                  size="sm" 
                  variant="secondary"
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="rounded-r-none"
                  aria-label="Previous page"
              >
                  <i className="bi bi-chevron-left"></i>
              </Button>
             
             {paginationNumbers.map((page, index) => 
              typeof page === 'number' ? (
                <Button
                  key={index}
                  size="sm"
                  variant={currentPage === page ? 'primary' : 'secondary'}
                  onClick={() => onPageChange(page)}
                  disabled={currentPage === page}
                  className="rounded-none"
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </Button>
              ) : (
                <span key={index} className="px-3 py-1.5 text-sm font-medium text-neutral-600 bg-neutral-0 border-y border-neutral-300 dark:bg-neutral-1000 dark:border-neutral-700 dark:text-neutral-300">
                  ...
                </span>
              )
             )}
              <Button 
                  size="sm" 
                  variant="secondary"
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="rounded-l-none"
                  aria-label="Next page"
              >
                  <i className="bi bi-chevron-right"></i>
              </Button>
           </div>
         </div>
      )}
    </div>
  );
}

export default Table;