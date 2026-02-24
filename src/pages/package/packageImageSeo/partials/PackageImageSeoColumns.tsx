import type { ColumnDef } from '@tanstack/react-table';
import ActionButtons from '@/components/ActionButtons';
import type { IPackageImageSeoListItem } from '../interface/IPackageImageSeo';

interface ColumnsProps {
  packageImageSeoData?: { data?: { pagingCounter?: number } };
  updateId: { setValue: (value: string) => void; values?: string };
  updateModal: { open: () => void };
  deleteIdState: { setValue: (value: string) => void };
  deleteModal: { open: () => void };
}

export const getColumns = ({
  packageImageSeoData,
  updateId,
  updateModal,
  deleteIdState,
  deleteModal,
}: ColumnsProps): ColumnDef<IPackageImageSeoListItem>[] => [
  {
    id: 'S.N.',
    accessorKey: 'S.N.',
    size: 50,
    cell: ({ row }) => row.index + (packageImageSeoData?.data?.pagingCounter ?? 0),
  },

  {
    header: 'Package Image',
    size: 100,
    cell: ({ row }) => (
      <img
        src={row?.original?.image}
        alt={row.original?.package?.name || 'Package image'}
        className="w-16 h-16 object-cover rounded-md"
      />
    ),
  },
  {
    header: 'Package Name',
    cell: ({ row }) => {
      return <span>{row?.original?.package?.name}</span>;
    },
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
