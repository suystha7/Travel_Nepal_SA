import { type ColumnDef } from '@tanstack/react-table';

export const getSelectionColumn = <T,>(): ColumnDef<T> => ({
  id: 'select',
  size: 30,
  header: ({ table }) => (
    <div className="flex items-center justify-center">
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
        className="rounded-sm shadow-sm bg-white"
      />
    </div>
  ),
  cell: ({ row }) => (
    <div className="flex items-center justify-center">
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onChange={row.getToggleSelectedHandler()}
        className="rounded-sm shadow-sm bg-white checked:bg-red-600"
      />
    </div>
  ),
  enableSorting: false,
  enableHiding: false,
});
