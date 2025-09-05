import React, { useState } from 'react';
import { Column } from './Table';

interface NestableDataItem {
  id: string | number;
  children?: NestableDataItem[];
  [key: string]: any;
}

interface NestingTableProps<T extends NestableDataItem> {
  columns: Column<T>[];
  data: T[];
}

const TableRow = <T extends NestableDataItem>({ item, columns, level }: { item: T, columns: Column<T>[], level: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <>
      <tr className="bg-neutral-0 dark:bg-neutral-1000 border-b dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900">
        {columns.map((col, index) => (
          <td key={col.id} className="px-6 py-4 whitespace-nowrap">
            {index === 0 ? (
              <div className="flex items-center" style={{ paddingLeft: `${level * 20}px` }}>
                {hasChildren && (
                  <button onClick={() => setIsExpanded(!isExpanded)} className="mr-2 text-primary">
                    <i className={`bi bi-chevron-right transition-transform ${isExpanded ? 'rotate-90' : ''}`}></i>
                  </button>
                )}
                <div className={`${!hasChildren && 'ml-6'}`}>
                  {col.cell ? col.cell(item) : col.accessor(item)}
                </div>
              </div>
            ) : (
              col.cell ? col.cell(item) : col.accessor(item)
            )}
          </td>
        ))}
      </tr>
      {isExpanded && hasChildren && item.children!.map((child) => (
        <TableRow key={child.id} item={child as T} columns={columns} level={level + 1} />
      ))}
    </>
  );
};

const TableNesting = <T extends NestableDataItem>({ columns, data }: NestingTableProps<T>) => {
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
            <TableRow key={item.id} item={item} columns={columns} level={0} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableNesting;
