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
    id: 'S.N.',
    accessorKey: 'S.N.',
    size: 50,
    cell: ({ row }) => row.index + (testimonialData?.data?.pagingCounter ?? 0),
  },
  {
    header: 'Image',
    accessorKey: 'image',
    size: 100,
    cell: ({ row }) => (
      <img
        src={row.original.image}
        alt={row.original.name || 'Testimonial image'}
        className="w-16 h-16 object-cover rounded-md"
      />
    ),
  },
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Rating',
    accessorKey: 'rating',
    cell: ({ row }) => {
      const rating = Number(row.original.rating);
      const stars = Array.from({ length: 5 }, (_, i) => i < rating);

      return (
        <div className="flex gap-1">
          {stars.map((filled, idx) =>
            filled ? (
              <Star key={idx} size={16} color="#f5b50a" fill="#f5b50a" />
            ) : (
              <Star key={idx} size={16} color="#ccc" />
            )
          )}
        </div>
      );
    },
  },
  {
    header: 'Action',
    size: 100,
    cell: ({ row }) => (
      <ActionButtons
        row={row}
        viewId={viewId}
        viewModal={viewModal}
        deleteIdState={deleteIdState}
        deleteModal={deleteModal}
      />
    ),
  },
];
