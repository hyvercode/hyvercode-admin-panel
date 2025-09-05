import React, { useState } from 'react';
import { Column } from './Table';

interface ExpandableTableProps<T> {
  columns: Column<T>[];
  data: T[];
  getRowId: (item: T) => string | number;
  renderExpandedRow: (item: T) => React.ReactNode;
}

const TableExpandable = <T,>({ columns, data, getRowId, renderExpandedRow }: ExpandableTableProps<T>) => {
  const [expandedRows, setExpandedRows] = useState<Set<string | number>>(new Set());

  const toggleRow = (id: string | number) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(id)) {
      newExpandedRows.delete(id);
    } else {
      newExpandedRows.add(id);
    }
    setExpandedRows(newExpandedRows);
  };

  return (
    <div className="overflow-x-auto bg-neutral-0 dark:bg-neutral-1000 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-900">
      <table className="w-full text-sm text-left text-neutral-600 dark:text-neutral-400">
        <thead className="text-xs text-neutral-800 uppercase bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-300">
          <tr>
            <th scope="col" className="px-4 py-3 w-12"></th>
            {columns.map((col) => (
              <th scope="col" key={col.id} className="px-6 py-3 font-medium">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            const id = getRowId(item);
            const isExpanded = expandedRows.has(id);
            return (
              <React.Fragment key={id}>
                <tr className="bg-neutral-0 dark:bg-neutral-1000 border-b dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900">
                  <td className="px-4 py-4">
                    <button onClick={() => toggleRow(id)} className="text-primary">
                      <i className={`bi bi-chevron-right transition-transform ${isExpanded ? 'rotate-90' : ''}`}></i>
                    </button>
                  </td>
                  {columns.map((col) => (
                    <td key={col.id} className="px-6 py-4 whitespace-nowrap">
                      {col.cell ? col.cell(item) : col.accessor(item)}
                    </td>
                  ))}
                </tr>
                {isExpanded && (
                  <tr className="bg-neutral-50 dark:bg-neutral-900/50">
                    <td colSpan={columns.length + 1} className="p-4">
                      {renderExpandedRow(item)}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableExpandable;
