import { cn } from '@/lib/utils'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type HeaderGroup,
  type RowSelectionState
} from '@tanstack/react-table'
import React, { useCallback, useMemo } from 'react'
import CustomPagination from './CustomPagination'
import { usePagination } from '@/hooks/usePagination'

interface TableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  getRowId?: (row: T, index: number) => string
  rowSelection?: RowSelectionState
  setRowSelection?: React.Dispatch<React.SetStateAction<RowSelectionState>>
  onSelectedRowsChange?: (rows: T[]) => void
  mainClassName?: string
  tHeadCellClassName?: string
  totalItems?: number
  totalPages?: number
  pages?: { [key: string]: any }
  isPagination?: boolean
}

const Table = <T,>({
  data,
  columns,
  getRowId,
  rowSelection,
  setRowSelection,
  totalItems = 0,
  totalPages = 0,
  // pages,
  onSelectedRowsChange,
  mainClassName,
  tHeadCellClassName,
  isPagination = true
}: TableProps<T>) => {
  const pagination = usePagination()

  const tableConfig = useMemo(
    () => ({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      manualPagination: true,
      pageCount: totalPages,
      state: {
        rowSelection,
        pagination: pagination.pagination
      },
      enableRowSelection: true,
      enableMultiRowSelection: true,
      enableColumnResizing: false,
      onRowSelectionChange: setRowSelection,
      onPaginationChange: pagination.handlePaginationChange,
      getPaginationRowModel: getPaginationRowModel(),
      getRowId
    }),
    [
      data,
      columns,
      totalPages,
      rowSelection,
      pagination.pagination,
      setRowSelection,
      pagination.handlePaginationChange,
      getRowId
    ]
  )

  const table = useReactTable(tableConfig)

  const handleSelectedRowsChange = useCallback(() => {
    if (onSelectedRowsChange) {
      const selectedData = table.getSelectedRowModel().rows.map(
        row => row.original
      )
      onSelectedRowsChange(selectedData)
    }
  }, [onSelectedRowsChange, table])

  React.useEffect(() => {
    handleSelectedRowsChange()
  }, [rowSelection, handleSelectedRowsChange])

  const handlePageChange = useCallback(
    (page: number) => {
      pagination.handlePaginationChange({
        pageIndex: page - 1,
        pageSize: pagination.pagination.pageSize
      })
    },
    [pagination]
  )

  const handlePerPageChange = useCallback(
    (size: number) => {
      pagination.handlePaginationChange({
        pageIndex: 0,
        pageSize: size
      })
    },
    [pagination]
  )

  const renderHeader = useCallback(
    (headerGroup: HeaderGroup<T>) => (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map(header => (
          <th
            key={header.id}
            style={{
              width: header.column.getSize(),
              minWidth: header.column.columnDef.minSize,
              maxWidth: header.column.columnDef.maxSize
            }}
            className={cn(
              'py-3 text-primary-500 bg-white border-b border-primary-200',
              tHeadCellClassName
            )}
          >
            <div className="flex justify-center items-center">
              {flexRender(header.column.columnDef.header, header.getContext())}
            </div>
          </th>
        ))}
      </tr>
    ),
    [tHeadCellClassName]
  )

  const renderRow = useCallback(
    (row: any, index: number) => (
      <tr
        key={row.id}
        className={`hover:bg-primary-50/50 ${
          index % 2 === 0 ? '' : 'bg-primary-50/20'
        }`}
      >
        {row.getVisibleCells().map((cell: any) => (
          <td
            key={cell.id}
            style={{
              width: cell.column.getSize(),
              minWidth: cell.column.columnDef.minSize,
              maxWidth: cell.column.columnDef.maxSize
            }}
            className="px-5 py-3 border-b border-primary-200"
          >
            <div className="flex justify-center items-center text-center">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          </td>
        ))}
      </tr>
    ),
    []
  )

  return (
    <div
      className={cn(
        'w-full border border-primary-200 rounded-xl overflow-x-hidden bg-white',
        mainClassName
      )}
    >
      <div className="w-full overflow-auto">
        <table className="w-full table-fixed border-separate border-spacing-0">
          <thead className="bg-white">
            {table.getHeaderGroups().map(renderHeader)}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row, index) =>
              renderRow(row, index)
            )}
          </tbody>
        </table>
      </div>

      {isPagination && (
        <div className="p-3">
          <CustomPagination
            currentPage={pagination.pagination.pageIndex + 1}
            totalItems={totalItems}
            pageCount={totalPages}
            perPage={pagination.pagination.pageSize}
            onPageChange={handlePageChange}
            onPerPageChange={handlePerPageChange}
          />
        </div>
      )}
    </div>
  )
}

export default Table