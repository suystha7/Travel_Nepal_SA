import type { ColumnDef } from '@tanstack/react-table';
import ActionButtons from '@/components/ActionButtons';
import type { IPackageGalleryListItem } from '../interface/IPackageGallery';

interface ColumnsProps {
  packageGalleryData?: { data?: { pagingCounter?: number } };
  updateId: { setValue: (value: string) => void; values?: string };
  updateModal: { open: () => void };
  deleteIdState: { setValue: (value: string) => void };
  deleteModal: { open: () => void };
}

export const getColumns = ({
  packageGalleryData,
  updateId,
  updateModal,
  deleteIdState,
  deleteModal,
}: ColumnsProps): ColumnDef<IPackageGalleryListItem>[] => [
  {
    id: 'S.N.',
    accessorKey: 'S.N.',
    size: 50,
    cell: ({ row }) => row.index + (packageGalleryData?.data?.pagingCounter ?? 0),
  },
   {
    header: 'Main Image',
    size: 100,
    cell: ({ row }) => (
      <img
        src={row.original.images?.url || ''}
        alt={row.original.id || 'Package image'}
        className="w-16 h-16 object-cover rounded-md"
      />
    ),
  },
  {
    header: 'Package Name',
    size: 100,
    cell: ({ row }) => (
      <span>{row.original.package?.name || '-'}</span>
    ),
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
