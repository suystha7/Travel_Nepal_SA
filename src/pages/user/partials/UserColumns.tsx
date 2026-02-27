import ActionButtons from '@/components/ActionButtons';
import type { ColumnDef } from '@tanstack/react-table';
import type { IUserListItem } from '../interface/IUser';

interface ColumnsProps {
  userData?: { data?: { users?: IUserListItem[]; pagingCounter?: number } };
  updateId?: { setValue: (value: string) => void; values?: string };
  updateModal?: { open: () => void };
  deleteIdState?: { setValue: (value: string) => void };
  deleteModal?: { open: () => void };
  isSuperuser?: boolean;
  isAdmin?: boolean;
  currentUserId?: string;
  onResetPassword?: (id: string) => void;
}

export const getColumns = ({
  userData,
  updateId,
  updateModal,
  deleteIdState,
  deleteModal,
  isSuperuser,
  isAdmin,
  currentUserId,
  onResetPassword,
}: ColumnsProps): ColumnDef<IUserListItem>[] => [
  {
    id: 'S.N.',
    accessorKey: 'S.N.',
    size: 50,
    cell: ({ row }) => row.index + (userData?.data?.pagingCounter ?? 0),
  },
  {
    header: 'Avatar',
    size: 100,
    cell: ({ row }) => (
      <img
        src={row.original.avatar}
        alt={row.original.full_name || 'Avatar'}
        className="w-14 h-14 object-cover rounded-md"
      />
    ),
  },
  {
    header: 'Full Name',
    accessorKey: 'full_name',
  },
  {
    header: 'Email',
    accessorKey: 'email',
  },
  {
    header: 'Role',
    accessorKey: 'role',
    cell: ({ row }) => {
      switch (row.original.role) {
        case 'superadmin':
          return (
            <span className="bg-white px-2 text-primary-500 text-sm border border-primary-500 rounded-full">
              Superadmin
            </span>
          );
        case 'admin':
          return (
            <span className="bg-white px-2 text-secondary-500 text-sm border border-secondary-500 rounded-full">
              Admin
            </span>
          );
        case 'staff':
          return (
            <span className="bg-white px-2 text-blue-500 text-sm border border-blue-500 rounded-full">
              Staff
            </span>
          );
        default:
          return null;
      }
    },
  },
  {
    header: 'Status',
    accessorKey: 'is_active',
    size: 100,
    cell: ({ row }) =>
      row.original.is_active ? (
        <span className="text-green-500 px-2 text-sm rounded-full border border-green-500">
          Active
        </span>
      ) : (
        <span className="text-red-500 px-2 text-sm rounded-full border border-red-500">
          Inactive
        </span>
      ),
  },
  {
    header: 'Action',
    size: 200,
    cell: ({ row }) => {
      const isSelf = row.original.id === currentUserId;
      const isTargetSuperuser = row.original.role === 'superadmin';

      const disableDelete = isSelf || isTargetSuperuser;
      const disableUpdate = isTargetSuperuser;

      const canReset = (isSuperuser || isAdmin) && !isSelf && !isTargetSuperuser;

      return (
        <div className="flex items-center gap-4 group">
          <ActionButtons
            row={row}
            updateId={updateId}
            updateModal={updateModal}
            deleteIdState={deleteIdState}
            deleteModal={deleteModal}
            disableDelete={disableDelete}
            disableUpdate={disableUpdate}
          />

          {canReset && (
            <button
              onClick={() => onResetPassword?.(row.original.id)}
              className="bg-white px-3 py-1 text-primary-500 text-sm border rounded-md cursor-pointer"
            >
              Reset Password
            </button>
          )}
        </div>
      );
    },
  },
];

export const getFilteredSortedUsers = (users?: IUserListItem[]) =>
  (users || [])
    .filter(user => user.role !== 'user')
    .sort((a, b) => {
      if (a.role === 'superadmin') return -1;
      if (b.role === 'superadmin') return 1;
      return 0;
    });
