import type { ColumnDef } from '@tanstack/react-table';
import type { IBreadcrumbListItem } from '../interface/IBreadcrumb';
import ActionButtons from '@/components/ActionButtons';

interface ColumnsProps {
  breadcrumbData?: { data?: { pagingCounter?: number } };
  updateId: { setValue: (value: string) => void; values?: string };
  updateModal: { open: () => void };
  deleteIdState: { setValue: (value: string) => void };
  deleteModal: { open: () => void };
}

export const getColumns = ({
  breadcrumbData,
  updateId,
  updateModal,
  deleteIdState,
  deleteModal,
}: ColumnsProps): ColumnDef<IBreadcrumbListItem>[] => [
  {
    id: 'S.N.',
    accessorKey: 'S.N.',
    size: 50,
    cell: ({ row }) => row.index + (breadcrumbData?.data?.pagingCounter ?? 0),
  },
  // {
  //   header: 'Image',
  //   accessorKey: 'image',
  //   size: 100,
  //   cell: ({ row }) => (
  //     <img
  //       src={row.original.image}
  //       alt={row.original.title || 'Breadcrumb image'}
  //       className="w-16 h-16 object-cover rounded-full"
  //     />
  //   ),
  // },
  {
    header: 'Type',
    cell: ({ row }) => <div className="capitalize">{row.original.type}</div>,
  },
  {
    header: 'Title',
    accessorKey: 'title',
  },
  {
    header: 'Subtitle',
    accessorKey: 'subtitle',
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
