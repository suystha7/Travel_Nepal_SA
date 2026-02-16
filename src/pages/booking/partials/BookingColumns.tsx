import type { ColumnDef } from '@tanstack/react-table';
import ActionButtons from '@/components/ActionButtons';
import type { IBookingListItem } from '../interface/IBooking';

interface ColumnsProps {
  bookingData?: { data?: { pagingCounter?: number } };
  updateId: { setValue: (value: string) => void; values?: string };
  updateModal: { open: () => void };
  deleteIdState: { setValue: (value: string) => void };
  deleteModal: { open: () => void };
}

export const getColumns = ({
  bookingData,
  updateId,
  updateModal,
  deleteIdState,
  deleteModal,
}: ColumnsProps): ColumnDef<IBookingListItem>[] => [
  {
    id: 'S.N.',
    accessorKey: 'S.N.',
    size: 50,
    cell: ({ row }) => row.index + (bookingData?.data?.pagingCounter ?? 0),
  },

  {
    header: 'Title',
    accessorKey: 'title',
  },
  {
    header: 'Service',
    accessorKey: 'service',
  },
  {
    header: 'Customer',
    accessorKey: 'customer',
  },

  {
    header: 'Image',
    accessorKey: 'image',
    size: 100,
    cell: ({ row }) => (
      <img
        src={row.original.image}
        alt={row.original.title || 'Booking image'}
        className="w-16 h-16 object-cover rounded-md"
      />
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
