import React from 'react';
import Button from './Button';
import Pagination from './navigation/Pagination';

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
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
         </div>
      )}
    </div>
  );
}

export default Table;
