import type { ColumnDef } from '@tanstack/react-table';
import type { ICityListItem } from '../interface/ICity';
import ActionButtons from '@/components/ActionButtons';

interface ColumnsProps {
  cityData?: { data?: { pagingCounter?: number } };
  updateId: { setValue: (value: string) => void; values?: string };
  updateModal: { open: () => void };
  deleteIdState: { setValue: (value: string) => void };
  deleteModal: { open: () => void };
}

export const getColumns = ({
  cityData,
  updateId,
  updateModal,
  deleteIdState,
  deleteModal,
}: ColumnsProps): ColumnDef<ICityListItem>[] => [
  {
    id: 'S.N.',
    accessorKey: 'S.N.',
    size: 50,
    cell: ({ row }) => row.index + (cityData?.data?.pagingCounter ?? 0),
  },
  {
    header: 'Country Name',
    cell: ({ row }) => {
      return <span>{row.original.country.name}</span>;
    },
  },
  {
    header: 'City Name',
    accessorKey: 'name',
  },

  {
    header: 'Action',
    size: 200,
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
