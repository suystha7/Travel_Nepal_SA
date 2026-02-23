import type { ColumnDef } from '@tanstack/react-table';
import type { ITestimonialItem } from '../interface/ITestimonial';
import ActionButtons from '@/components/ActionButtons';
import { Star } from 'lucide-react';

interface ColumnsProps {
  testimonialData?: { data?: { pagingCounter?: number } };
  viewId: { setValue: (value: string) => void; values?: string };
  viewModal: { open: () => void };
  deleteIdState: { setValue: (value: string) => void };
  deleteModal: { open: () => void };
}

export const getColumns = ({
  testimonialData,
  viewId,
  viewModal,
  deleteIdState,
  deleteModal,
}: ColumnsProps): ColumnDef<ITestimonialItem>[] => [
  {
    header: 'S.N.',
    accessorKey: 'sn',
    size: 50,
    cell: ({ row }) => row.index + (testimonialData?.data?.pagingCounter ?? 1),
  },
  {
    header: 'User',
    accessorKey: 'user_id',
    cell: ({ row }) => {
      const user = row.original.user_id;
      const isObject = typeof user === 'object' && user !== null;
      
      return (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
            {isObject && 'image' in user && user.image ? (
              <img 
                src={user.image} 
                alt={user.full_name} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                NA
              </div>
            )}
          </div>
          <span className="font-medium text-sm">
            {isObject && 'full_name' in user ? user.full_name : (row.original.name || 'Anonymous')}
          </span>
        </div>
      );
    },  
  },
  {
    header: 'Package',
    accessorKey: 'package_id',
    cell: ({ row }) => {
      const pkg = row.original.package_id;
      return (
        <span className="text-sm text-slate-600 font-medium">
          {typeof pkg === 'object' && pkg !== null ? pkg.name : '-'}
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
              fill={i < rating ? "#f5b50a" : "transparent"}
              color={i < rating ? "#f5b50a" : "#cbd5e1"}
            />
          ))}
        </div>
      );
    },
  },
  {
    header: 'Action',
    size: 100,
    cell: ({ row }) => (
      <ActionButtons
        row={{
          original: {
            id: row.original.id,
            is_superuser: false 
          }
        }}
        viewId={viewId}
        viewModal={viewModal}
        deleteIdState={deleteIdState}
        deleteModal={deleteModal}
      />
    ),
  },
];