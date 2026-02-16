import type { ColumnDef } from '@tanstack/react-table';
import type { ISubscriberListItem } from '../interface/ISubscriber';

interface ColumnsProps {
  subscriberData?: { data?: { pagingCounter?: number } };
}

export const getColumns = ({ subscriberData }: ColumnsProps): ColumnDef<ISubscriberListItem>[] => [
  {
    id: 'S.N.',
    accessorKey: 'S.N.',
    size: 50,
    cell: ({ row }) => row.index + (subscriberData?.data?.pagingCounter ?? 0),
  },

  {
    header: 'Email',
    accessorKey: 'email',
  },
];
