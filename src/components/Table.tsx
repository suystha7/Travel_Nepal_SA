import { useReactTable, getCoreRowModel, flexRender, type ColumnDef } from '@tanstack/react-table';
import React from 'react';
import CustomPagination from './CustomPagination';

interface PagesProps {
  page: number;
  pageSize: number;
  setPage: (val: number) => void;
  setPageSize: (val: number) => void;
}

interface BaseTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  totalPage?: number;
  pages?: PagesProps;
  rowSelection?: Record<string, boolean>;
  setRowSelection?: (state: any) => void;
  showPagination?: boolean;
  emptyMessage?: string;
  className?: string;
  totalItem?: number;
  maxHeight?: string;
}

export default function Table<TData>({
  data,
  columns,
  totalPage,
  pages,
  rowSelection,
  setRowSelection,
  showPagination = true,
  emptyMessage = 'No data available',
  className = '',
  totalItem,
  maxHeight,
}: BaseTableProps<TData>): React.ReactElement {
  const table = useReactTable({
    data,
    columns,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: totalPage || -1,
  });

  // const [perPage, setPerPage] = useState(10);

  const pageSize = pages?.pageSize || 5;
  const currentPage = pages?.page || 1;

  return (
    <div
      className={`flex flex-col relative ${className}`}
      style={maxHeight ? { maxHeight } : undefined}
    >
      <div className="overflow-x-auto overflow-y-auto bg-white" style={{ maxHeight }}>
        <table className="w-full ">
          <thead className="bg-slate-100 rounded-2xl dark:bg-[#1b2638] dark:border-gray-700 sticky top-0 z-10 ">
            {table.getHeaderGroups().map(group => (
              <tr key={group.id}>
                {group.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-300 tracking-wider "
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map(row => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showPagination && pages && data.length > 0 && (
        <div className="p-6 w-full">
          <CustomPagination
            currentPage={currentPage}
            totalItems={totalItem || data.length}
            pageCount={totalPage || 1}
            perPage={pageSize}
            onPageChange={pages.setPage}
            onPerPageChange={value => {
              pages.setPageSize(value);
              pages.setPage(1);
            }}
          />
        </div>
      )}
    </div>
  );
}
