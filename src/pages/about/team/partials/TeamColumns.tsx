import type { ColumnDef } from '@tanstack/react-table';
import ActionButtons from '@/components/ActionButtons';
import type { ITeamListItem } from '../interface/ITeam';

interface ColumnsProps {
  teamData?: { data?: { pagingCounter?: number } };
  updateId: { setValue: (value: string) => void; values?: string };
  updateModal: { open: () => void };
  deleteIdState: { setValue: (value: string) => void };
  deleteModal: { open: () => void };
}

export const getColumns = ({
  teamData,
  updateId,
  updateModal,
  deleteIdState,
  deleteModal,
}: ColumnsProps): ColumnDef<ITeamListItem>[] => [
  {
    id: 'S.N.',
    accessorKey: 'S.N.',
    size: 50,
    cell: ({ row }) => row.index + (teamData?.data?.pagingCounter ?? 0),
  },
  {
    header: 'Image',
    accessorKey: 'photo',
    size: 100,
    cell: ({ row }) => (
      <img
        src={row.original.photo}
        alt={row.original.name || 'Team member image'}
        className="w-16 h-16 object-cover rounded-md"
      />
    ),
  },
  { header: 'Name', accessorKey: 'name' },
  {
    header: 'Position',
    accessorKey: 'role',
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
