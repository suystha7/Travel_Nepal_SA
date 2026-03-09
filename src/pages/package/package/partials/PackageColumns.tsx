import type { ColumnDef } from '@tanstack/react-table';
import ActionButtons from '@/components/ActionButtons';
import type { IPackageData } from '../interface/IPackage';

interface ColumnsProps {
  packageData?: { data?: { pagingCounter?: number } };
  updateId: { setValue: (value: string) => void; values?: string };
  updateModal: { open: () => void };
  deleteIdState: { setValue: (value: string) => void };
  deleteModal: { open: () => void };
}

export const getColumns = ({
  packageData,
  updateId,
  updateModal,
  deleteIdState,
  deleteModal,
}: ColumnsProps): ColumnDef<IPackageData>[] => {
  return [
    {
      id: 'S.N.',
      accessorKey: 'S.N.',
      size: 50, 
      cell: ({ row }) => row.index + (packageData?.data?.pagingCounter ?? 0),
    },
    {
      header: 'Package Type',
      cell: ({ row }) => {
        return <span>{row?.original?.package_type?.name}</span>;
      },
    },
    {
      header: 'Package Name',
      accessorKey: 'name',
      cell: ({ row }) => (
        <span className="block max-w-[300px] break-words" title={row.original.name}>
          {row.original.name}
        </span>
      ),
    },
    {
      header: 'Top Tours',
      accessorKey: 'is_top_tour',
      cell: ({ row }) => {
        const isActive = row.original.is_top_tour;
        return (
          <div className="flex items-center gap-2">
            <span className="capitalize">{isActive ? 'Yes' : 'No'}</span>
          </div>
        );
      },
    },
    {
      header: 'Top Deals',
      accessorKey: 'is_top_deals',
      cell: ({ row }) => {
        const isActive = row.original.is_top_deals;
        return (
          <div className="flex items-center gap-2">
            <span className="capitalize">{isActive ? 'Yes' : 'No'}</span>
          </div>
        );
      },
    },

    {
      header: 'Action',
      size: 150,
      cell: ({ row }) => {
        return (
          <ActionButtons
            row={row}
            updateId={updateId}
            updateModal={updateModal}
            deleteIdState={deleteIdState}
            deleteModal={deleteModal}
          />
        );
      },
    },
  ];
};
