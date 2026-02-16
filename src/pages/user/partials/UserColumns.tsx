import type { ColumnDef } from '@tanstack/react-table';
import type { IUserListItem } from '../interface/IUser';
import ActionButtons from '@/components/ActionButtons';

interface ColumnsProps {
  userData?: { data?: { pagingCounter?: number } };
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
  // {
  //   header: 'Avatar',
  //   size: 100,
  //   cell: ({ row }) => (
  //     <img
  //       src={row.original.avatar}
  //       alt={row.original.full_name || 'Package image'}
  //       className="w-14 h-14 object-cover rounded-md"
  //     />
  //   ),
  // },
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
      if (row.original.is_superuser) {
        return (
          <span className="bg-white px-2 text-red-500 text-sm border border-red-500 rounded-full">
            Superuser
          </span>
        );
      }

      if (row.original.is_admin) {
        return (
          <span className="bg-white px-2 text-yellow-500 text-sm border border-yellow-500 rounded-full">
            Admin
          </span>
        );
      }

      if (row.original.is_staff) {
        return (
          <span className="bg-white px-2 text-blue-500 text-sm border border-blue-500 rounded-full">
            Staff
          </span>
        );
      }

      return (
        <span className="bg-white px-2 text-gray-500 text-sm border border-gray-500 rounded-full">
          User
        </span>
      );
    },
  },

  {
    header: 'Status',
    accessorKey: 'is_active',
    cell: ({ row }) => {
      const isActive = row.original.is_active;
      return (
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-400'}`}
          ></span>
          <span className="capitalize">{isActive ? 'Active' : 'Inactive'}</span>
        </div>
      );
    },
  },
  {
    header: 'Action',
    size: 180,
    cell: ({ row }) => {
      const isSelf = row.original.id === currentUserId;
      const isTargetSuperuser = row.original.is_superuser;
      const disableDelete = isSelf || isTargetSuperuser;

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
