import type { ColumnDef } from '@tanstack/react-table';
import ActionButtons from '@/components/ActionButtons';
import type { ISocialMediaSettingsListItem } from '../interface/ISocialMediaSetting';
import { CircleIcon } from 'lucide-react';

interface ColumnsProps {
  socialMediaData?: { data?: { pagingCounter?: number } };
  updateId: { setValue: (value: string) => void; values?: string };
  updateModal: { open: () => void };
  deleteIdState: { setValue: (value: string) => void };
  deleteModal: { open: () => void };
}

export const getColumns = ({
  socialMediaData,
  updateId,
  updateModal,
  deleteIdState,
  deleteModal,
}: ColumnsProps): ColumnDef<ISocialMediaSettingsListItem>[] => [
  {
    id: 'S.N.',
    accessorKey: 'S.N.',
    size: 50,
    cell: ({ row }) => row.index + (socialMediaData?.data?.pagingCounter ?? 0),
  },

  {
    header: 'Platform Name',
    cell: ({ row }) => {
      return <span>{row.original.platform}</span>;
    },
  },
  {
    header: 'URL',
    accessorKey: 'url',
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: ({ row }) => {
      const status = row.original.status;
      const isActive = status === 'active';

      return (
        <div className="flex items-center gap-2">
          <CircleIcon
            className={`w-3 h-3 ${isActive ? 'text-green-500' : 'text-red-500'}`}
            fill="currentColor"
          />
          <span className="capitalize">{isActive ? 'Active' : 'Inactive'}</span>
        </div>
      );
    },
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
