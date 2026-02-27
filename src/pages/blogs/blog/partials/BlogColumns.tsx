import type { ColumnDef } from '@tanstack/react-table';
import ActionButtons from '@/components/ActionButtons';
import type { IBlogListItem } from '../interface/IBlog';

interface ColumnsProps {
  blogData?: { data?: { pagingCounter?: number } };
  updateId: { setValue: (value: string) => void; values?: string };
  updateModal: { open: () => void };
  deleteIdState: { setValue: (value: string) => void };
  deleteModal: { open: () => void };
}

export const getColumns = ({
  blogData,
  updateId,
  updateModal,
  deleteIdState,
  deleteModal,
}: ColumnsProps): ColumnDef<IBlogListItem>[] => {
  return [
    {
      id: 'S.N.',
      accessorKey: 'S.N.',
      size: 50,
      cell: ({ row }) => row.index + (blogData?.data?.pagingCounter ?? 0),
    },
    {
      header: 'Image',
      size: 100,
      cell: ({ row }) => (
        <img
          src={row.original.image}
          alt={row.original.title || 'Blog image'}
          className="w-16 h-16 object-cover rounded-full"
        />
      ),
    },
    {
      header: 'Category',
      cell: ({ row }) => {
        return <span>{row.original.category?.name}</span>;
      },
    },
    {
      header: 'Title',
      cell: ({ row }) => {
        return (
          <span className="block max-w-[400px] break-words" title={row.original.title}>
            {row.original.title}
          </span>
        );
      },
    },
    {
      header: 'Author',
      cell: ({ row }) => {
        return <span>{row.original?.author?.name}</span>;
      },
    },
  

    {
      header: 'Actions',
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
};
