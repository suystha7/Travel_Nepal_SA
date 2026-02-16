import type { ColumnDef } from '@tanstack/react-table';
import ActionButtons from '@/components/ActionButtons';
import type { IPackageVideoListItem } from '../interface/IPackageVideo';

interface ColumnsProps {
  packageVideoData?: { data?: { pagingCounter?: number } };
  updateId: { setValue: (value: string) => void; values?: string };
  updateModal: { open: () => void };
  deleteIdState: { setValue: (value: string) => void };
  deleteModal: { open: () => void };
}

export const getColumns = ({
  packageVideoData,
  updateId,
  updateModal,
  deleteIdState,
  deleteModal,
}: ColumnsProps): ColumnDef<IPackageVideoListItem>[] => [
  {
    id: 'S.N.',
    accessorKey: 'S.N.',
    size: 50,
    cell: ({ row }) => row.index + (packageVideoData?.data?.pagingCounter ?? 0),
  },
  {
    header: 'Video',
    size: 100,
    cell: ({ row }) => (
      <img
        src={row.original.video}
        alt="Package Video"
        className="w-16 h-16 object-cover rounded-md"
      />
    ),
  },
  {
    header: 'Package Name',
    accessorKey: 'package',
    cell: ({ row }) => {
      return row.original.package?.name;
    },
  },
  {
    header: 'Video URL',
    accessorKey: 'video_url',
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
