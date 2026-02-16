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
    header: 'Image',
    size: 100,
    cell: ({ row }) => (
      <img
        src={row.original.image}
        alt={row.original.type || 'Package image'}
        className="w-16 h-16 object-cover rounded-md"
      />
    ),
  },
  {
    header: 'Type',
    accessorKey: 'type',
  },
  {
    header: 'Name',
    cell: ({ row }) => {
      return row.original.package?.name || row.original.itinerary?.title || '-';
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
