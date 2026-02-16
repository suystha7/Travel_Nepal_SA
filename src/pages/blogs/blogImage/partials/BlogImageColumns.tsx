import type { ColumnDef } from '@tanstack/react-table';
import ActionButtons from '@/components/ActionButtons';
import type { IBlogImageListItem } from '../interface/IBlogImage';

interface ColumnsProps {
  blogImageData?: { data?: { pagingCounter?: number } };
  updateId: { setValue: (value: string) => void; values?: string };
  updateModal: { open: () => void };
  deleteIdState: { setValue: (value: string) => void };
  deleteModal: { open: () => void };
}

export const getColumns = ({
  blogImageData,
  updateId,
  updateModal,
  deleteIdState,
  deleteModal,
}: ColumnsProps): ColumnDef<IBlogImageListItem>[] => [
  {
    id: 'S.N.',
    accessorKey: 'S.N.',
    size: 50,
    cell: ({ row }) => row.index + (blogImageData?.data?.pagingCounter ?? 0),
  },

  {
    header: 'Blog Image',
    size: 100,
    cell: ({ row }) => (
      <img
        src={row?.original?.image}
        alt={row.original?.blog?.title || 'Blog image'}
        className="w-16 h-16 object-cover rounded-md"
      />
    ),
  },
  {
    header: 'Blog Name',
    cell: ({ row }) => {
      return <span>{row?.original?.blog?.title}</span>;
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
