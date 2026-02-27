import type { ColumnDef } from '@tanstack/react-table';
import ActionButtons from '@/components/ActionButtons';
import type { IStaticSEOListItem } from '../interface/IStaticSEO';

interface ColumnsProps {
  seoData?: { data?: { pagingCounter?: number } };
  updateId: { setValue: (value: string) => void; values?: string };
  updateModal: { open: () => void };
  deleteIdState: { setValue: (value: string) => void };
  deleteModal: { open: () => void };
}

export const getColumns = ({
  seoData,
  updateId,
  updateModal,
  deleteIdState,
  deleteModal,
}: ColumnsProps): ColumnDef<IStaticSEOListItem>[] => [
  {
    id: 'S.N.',
    accessorKey: 'S.N',
    size: 50,
    cell: ({ row }) => row.index + (seoData?.data?.pagingCounter ?? 0),
  },
  {
    header: 'SEO For',
    accessorKey: 'seo_for',
    cell: ({ row }) =>
      row.original.seo_for?.slice(0).charAt(0).toUpperCase() + row.original.seo_for?.slice(1),
  },
  {
    header: 'Meta Title', 
    accessorKey: 'meta_title',
  },

  {
    header: 'Action',
    size: 150,
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
