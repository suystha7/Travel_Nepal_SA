import type { ColumnDef } from '@tanstack/react-table';
import ActionButtons from '@/components/ActionButtons';
import type { IPackageCategoryListItem } from '../interface/IPackageCategory';

interface ColumnsProps {
  packageCategoryData?: { data?: { pagingCounter?: number } };
  updateId: { setValue: (value: string) => void; values?: string };
  updateModal: { open: () => void };
  deleteIdState: { setValue: (value: string) => void };
  deleteModal: { open: () => void };
}

export const getColumns = ({
  packageCategoryData,
  updateId,
  updateModal,
  deleteIdState,
  deleteModal,
}: ColumnsProps): ColumnDef<IPackageCategoryListItem>[] => [
  {
    id: 'S.N.',
    accessorKey: 'S.N.',
    size: 50,
    cell: ({ row }) => row.index + (packageCategoryData?.data?.pagingCounter ?? 0),
  },
  {
    header: 'Image',
    accessorKey: 'image',
    size: 100,
    cell: ({ row }) => (
      <img
        src={row.original.image}
        alt={row.original.name || 'Package image'}
        className="w-16 h-16 object-cover rounded-full"
      />
    ),
  },
  {
    header: 'Package Type',
    accessorKey: 'package_type.name',
  },
  {
    header: 'Package Category',
    accessorKey: 'name',
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
