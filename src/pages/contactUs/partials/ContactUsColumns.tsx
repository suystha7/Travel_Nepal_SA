import type { ColumnDef } from '@tanstack/react-table';
import type { IContactUsListItem } from '../interface/IContactUs';
import ActionButtons from '@/components/ActionButtons';

interface ColumnsProps {
  contactUsData?: { data?: { pagingCounter?: number } };
  viewId?: { setValue: (value: string) => void; values?: string };
  viewModal?: { open: () => void };
}

export const getColumns = ({
  contactUsData,
  viewId,
  viewModal,
}: ColumnsProps): ColumnDef<IContactUsListItem>[] => [
  {
    id: 'S.N.',
    accessorKey: 'S.N.',
    size: 50,
    cell: ({ row }) => row.index + (contactUsData?.data?.pagingCounter ?? 0),
  },
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Email',
    accessorKey: 'email',
  },
  {
    header: 'Phone',
    accessorKey: 'phone',
  },
  {
    header: 'Service',
    cell: ({ row }) => {
      const service = row.original.service?.replace(/_/g, ' ') || '';
      return <span className="capitalize">{service}</span>;
    },
  },

  {
    header: 'Action',
    size: 200,
    cell: ({ row }) => (
      <ActionButtons
        row={{ ...row, original: { ...row.original, id: row.original.id || '' } }}
        viewId={viewId}
        viewModal={viewModal}
      />
    ),
  },
];
