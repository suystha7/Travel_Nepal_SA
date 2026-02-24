import type { ColumnDef } from '@tanstack/react-table';
import ActionButtons from '@/components/ActionButtons';
import type { IPackageSeoListItem } from '../interface/IPackageSeo';

interface ColumnsProps {
  packageSeoData?: { data?: { pagingCounter?: number } };
  updateId: { setValue: (value: string) => void; values?: string };
  updateModal: { open: () => void };
  deleteIdState: { setValue: (value: string) => void };
  deleteModal: { open: () => void };
}

export const getColumns = ({
  packageSeoData,
  updateId,
  updateModal,
  deleteIdState,
  deleteModal,
}: ColumnsProps): ColumnDef<IPackageSeoListItem>[] => [
  {
    id: 'S.N.',
    accessorKey: 'S.N',
    size: 50,
    cell: ({ row }) => row.index + (packageSeoData?.data?.pagingCounter ?? 0),
  },
  {
    header: 'Package Name',
    accessorKey: 'package',
    cell: ({ row }) => row?.original?.package?.name || 'N/A',
  },
  {
    header: 'Meta Title',
    accessorKey: 'meta_title',
  },

  {
    header: 'Action',
    size: 100,
    cell: ({ row }) => (
      <ActionButtons
        row={row}
        updateId={updateId}
        updateModal={updateModal}
        deleteIdState={deleteIdState}
        deleteModal={deleteModal}
      />
    ),
  },
];
