import type { ColumnDef } from '@tanstack/react-table';
import type { IReviewItem } from '../interface/IReview';
import ActionButtons from '@/components/ActionButtons';
import { Star } from 'lucide-react';

interface ColumnsProps {
  reviewData?: { data?: { pagingCounter?: number } };
  viewId: { setValue: (value: string) => void; values?: string };
  viewModal: { open: () => void };
  approveId: { setValue: (value: string) => void };
  approveModal: { open: () => void };
}

export const getColumns = ({
  reviewData,
  viewId,
  viewModal,
  approveId,
  approveModal,
}: ColumnsProps): ColumnDef<IReviewItem>[] => [
  {
    header: 'S.N.',
    accessorKey: 'sn',
    size: 50,
    cell: ({ row }) => row.index + (reviewData?.data?.pagingCounter ?? 1),
  },
  {
    header: 'User',
    accessorKey: 'user',
    cell: ({ row }) => {
      const user = row.original.user;
      return (
        <div className="flex items-center gap-3">
          <span className="font-medium text-sm">
            {user?.full_name || 'Anonymous'}
          </span>
        </div>
      );
    },
  },
  {
    header: 'Package',
    accessorKey: 'package',
    cell: ({ row }) => {
      const pkg = row.original.package;
      return (
        <span className="text-sm font-medium">
          {pkg?.name || '-'}
        </span>
      );
    },
  },
  {
    header: 'Rating',
    accessorKey: 'rating',
    cell: ({ row }) => {
      const rating = Number(row.original.rating) || 0;
      return (
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              fill={i < rating ? '#f5b50a' : 'transparent'}
              color={i < rating ? '#f5b50a' : '#cbd5e1'}
            />
          ))}
        </div>
      );
    },
  },
  {
    header: 'Action',
    size: 120,
    cell: ({ row }) => (
      <ActionButtons
        row={{
          ...row,
          original: {
            ...row.original,
            id: row.original.id || '',
          },
        }}
        viewId={viewId}
        viewModal={viewModal}
        approveId={approveId}
        approveModal={approveModal}
      />
    ),
  },
];