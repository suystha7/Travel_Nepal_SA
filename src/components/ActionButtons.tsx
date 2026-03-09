import { Pencil, Trash2, Eye, Check } from 'lucide-react';
import { toast } from 'react-toastify';

interface ActionButtonsProps {
  row: {
    original: {
      id: string;
      role?: string;
      approve?: boolean;
    };
  };
  currentUserRole?: string; // added to know if current user is superadmin/admin
  updateId?: { setValue: (value: string) => void };
  updateModal?: { open: () => void };
  deleteIdState?: { setValue: (value: string) => void };
  deleteModal?: { open: () => void };
  viewId?: { setValue: (value: string) => void };
  viewModal?: { open: () => void };
  approveId?: { setValue: (value: string) => void };
  approveModal?: { open: () => void };
  onUpdate?: (id: string) => void;
}

const ActionButtons = ({
  row,
  currentUserRole = 'user',
  updateId,
  updateModal,
  deleteIdState,
  deleteModal,
  viewId,
  viewModal,
  approveId,
  approveModal,
  onUpdate,
}: ActionButtonsProps) => {
  const { id, role: targetRole, approve: isApproved } = row.original;

  const isSelf = false;
  const isTargetSuperuser = targetRole === 'superadmin';
  const disableDelete = isSelf || (isTargetSuperuser && currentUserRole !== 'superadmin');
  const disableUpdate = isSelf || (isTargetSuperuser && currentUserRole !== 'superadmin');
  const canApprove =
    !isApproved && (currentUserRole === 'superadmin' || currentUserRole === 'admin');

  const handleDelete = () => {
    if (disableDelete) {
      if (isTargetSuperuser) toast.error("You can't delete a superadmin");
      else toast.error("You can't delete this user");
      return;
    }
    deleteIdState?.setValue(id);
    deleteModal?.open();
  };

  const handleUpdate = () => {
    if (disableUpdate) {
      if (isTargetSuperuser) toast.error("You can't update a superadmin");
      else toast.error("You don't have permission to update this user");
      return;
    }

    if (onUpdate) {
      onUpdate(id);
      return;
    }

    updateId?.setValue(id);
    updateModal?.open();
  };

  const handleApprove = () => {
    approveId?.setValue(id);
    approveModal?.open();
  };

  const Tooltip = ({ label }: { label: string }) => (
    <span className="absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap rounded-md bg-primary-500 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition pointer-events-none z-50">
      {label}
    </span>
  );

  return (
    <div className="flex items-center gap-2">
      {viewId && viewModal && (
        <div className="relative group">
          <Tooltip label="View" />
          <button
            onClick={() => {
              viewId.setValue(id);
              viewModal.open();
            }}
            className="text-blue-500 hover:text-blue-600 bg-blue-300/20 rounded-full p-2 cursor-pointer"
          >
            <Eye size={16} />
          </button>
        </div>
      )}

      {canApprove && approveId && approveModal && (
        <div className="relative group">
          <Tooltip label="Approve Review" />
          <button
            onClick={handleApprove}
            className="text-green-500 hover:text-green-600 bg-green-300/20 rounded-full p-2 cursor-pointer"
          >
            <Check size={16} />
          </button>
        </div>
      )}

      {updateId && updateModal && (
        <div className="relative group">
          <Tooltip label="Update" />
          <button
            onClick={handleUpdate}
            disabled={disableUpdate}
            className={`rounded-full p-2 ${
              disableUpdate
                ? 'text-white bg-primary-200/50 cursor-not-allowed'
                : 'text-primary-500 hover:text-primary-600 bg-primary-300/20 cursor-pointer'
            }`}
          >
            <Pencil size={16} />
          </button>
        </div>
      )}

      {deleteIdState && deleteModal && (
        <div className="relative group">
          <Tooltip label="Delete" />
          <button
            onClick={handleDelete}
            disabled={disableDelete}
            className={`rounded-full p-2 ${
              disableDelete
                ? 'text-white bg-red-200/50 cursor-not-allowed'
                : 'text-red-500 hover:text-red-600 bg-red-300/20 cursor-pointer'
            }`}
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionButtons;
