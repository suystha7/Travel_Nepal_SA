import type { ColumnDef } from '@tanstack/react-table';
import type { IReservationListItem } from '../interface/IReservation';
import ActionButtons from '@/components/ActionButtons';

interface ColumnsProps {
  reservationData?: { data?: { pagingCounter?: number } };
  updateId: { setValue: (value: string) => void; values?: string };
  updateModal: { open: () => void };
  viewId?: { setValue: (value: string) => void; values?: string };
  viewModal?: { open: () => void };
  deleteIdState: { setValue: (value: string) => void };
  deleteModal: { open: () => void };
}

export const getColumns = ({
  reservationData,
  updateId,
  updateModal,
  deleteIdState,
  deleteModal,
  viewId,
  viewModal,
}: ColumnsProps): ColumnDef<IReservationListItem>[] => [
  {
    id: 'S.N.',
    accessorKey: 'S.N.',
    size: 50,
    cell: ({ row }) => row.index + (reservationData?.data?.pagingCounter ?? 0),
  },
  {
    header: 'Reservation Type',
    cell: ({ row }) => <div className="capitalize">{row.original.type.replace(/_/g, ' ')}</div>,
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
        viewId={viewId}
        viewModal={viewModal}
      />
    ),
  },
];
