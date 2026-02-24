import type { ColumnDef } from '@tanstack/react-table';
import ActionButtons from '@/components/ActionButtons';
import type { IBlogSeoListItem } from '../interface/IBlogSeo';

interface ColumnsProps {
  blogSeoData?: { data?: { pagingCounter?: number } };
  updateId: { setValue: (value: string) => void; values?: string };
  updateModal: { open: () => void };
  deleteIdState: { setValue: (value: string) => void };
  deleteModal: { open: () => void };
}

export const getColumns = ({
  blogSeoData,
  updateId,
  updateModal,
  deleteIdState,
  deleteModal,
}: ColumnsProps): ColumnDef<IBlogSeoListItem>[] => [
  {
    id: 'S.N.',
    accessorKey: 'S.N',
    size: 50,
    cell: ({ row }) => row.index + (blogSeoData?.data?.pagingCounter ?? 0),
  },
  {
    header: 'Blog Title',
    accessorKey: 'blog',
    cell: ({ row }) => row?.original?.blog?.title || 'N/A',
  },
  {
    header: 'Meta Title',
    accessorKey: 'meta_title',
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
