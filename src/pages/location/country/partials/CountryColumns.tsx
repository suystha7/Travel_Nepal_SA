import type { ColumnDef } from '@tanstack/react-table';
import type { ICountryListItem } from '../interface/ICountry';
import ActionButtons from '@/components/ActionButtons';

interface ColumnsProps {
  countryData?: { data?: { pagingCounter?: number } };
  updateId: { setValue: (value: string) => void; values?: string };
  updateModal: { open: () => void };
  deleteIdState: { setValue: (value: string) => void };
  deleteModal: { open: () => void };
}

export const getColumns = ({
  countryData,
  updateId,
  updateModal,
  deleteIdState,
  deleteModal,
}: ColumnsProps): ColumnDef<ICountryListItem>[] => [
  {
    id: 'S.N.',
    accessorKey: 'S.N.',
    size: 50,
    cell: ({ row }) => row.index + (countryData?.data?.pagingCounter ?? 0),
  },
  {
    header: 'Country Logo',
    size: 100,
    cell: ({ row }) => (
      <img
        src={row.original.image}
        alt={row.original.name || 'User avatar'}
        className="w-16 h-16 object-cover rounded-md"
      />
    ),
  },

  {
    header: 'Continent',
    accessorKey: 'continent',
    cell: ({ row }) => {
      const value = row.original.continent || '';

      const formatted = value
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      return <div>{formatted}</div>;
    },
  },

  {
    header: 'Country Name',
    accessorKey: 'name',
  },
  {
    header: 'Destination Type',
    accessorKey: 'destination_type',
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
