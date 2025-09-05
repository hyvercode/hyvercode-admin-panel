import React from 'react';

// A more flexible Column definition
export interface Column<T> {
  header: string;
  // Use a function to access data, allowing for nested properties or computed values
  accessor: (item: T) => any;
  // Custom cell renderer
  cell?: (item: T) => React.ReactNode;
  // Adding an ID for key props
  id: string; 
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  // Assuming each data item has a unique 'id' property
  getRowId: (item: T) => string | number;
}

const Table = <T,>({ columns, data, getRowId }: TableProps<T>) => {
  return (
    <div className="overflow-x-auto bg-neutral-0 dark:bg-neutral-1000 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-900">
      <table className="w-full text-sm text-left text-neutral-600 dark:text-neutral-400">
        <thead className="text-xs text-neutral-800 uppercase bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-300">
          <tr>
            {columns.map((col) => (
              <th scope="col" key={col.id} className="px-6 py-3 font-medium">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={getRowId(item)} className="bg-neutral-0 dark:bg-neutral-1000 border-b dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900">
              {columns.map((col) => (
                <td key={col.id} className="px-6 py-4 whitespace-nowrap">
                  {col.cell ? col.cell(item) : col.accessor(item)}
                </td>
              ))}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
                <td colSpan={columns.length} className="text-center py-8 text-neutral-500">
                    No data available.
                </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
