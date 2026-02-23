import { Pencil, Trash2, Eye } from 'lucide-react';

interface ActionButtonsProps {
  row: {
    original: {
      id: string;
      is_superuser?: boolean;
    };
  };
  updateId?: { setValue: (value: string) => void };
  updateModal?: { open: () => void };
  deleteIdState?: { setValue: (value: string) => void };
  deleteModal?: { open: () => void };
  viewId?: { setValue: (value: string) => void };
  viewModal?: { open: () => void };
  disableDelete?: boolean;
  disableUpdate?: boolean;
}

const ActionButtons = ({
  row,
  updateId,
  updateModal,
  deleteIdState,
  deleteModal,
  viewId,
  viewModal,
  disableDelete,
  disableUpdate,
}: ActionButtonsProps) => {
  const id = row.original.id;
  const isSuperuser = row.original.is_superuser;

  const handleDelete = () => {
    if (disableDelete) {
      if (isSuperuser) {
        alert("You can't delete a superuser account");
      } else {
        alert("You can't delete your own account.");
      }
      return;
    }

    deleteIdState?.setValue(id);
    deleteModal?.open();
  };

  const handleUpdate = () => {
    if (disableUpdate) {
      if (isSuperuser) {
        alert("You can't update a superuser account");
      }
      return;
    }

    updateId?.setValue(id);
    updateModal?.open();
  };

  return (
    <div className="flex items-center gap-2">
      {viewId && viewModal && (
        <button
          onClick={() => {
            viewId.setValue(id);
            viewModal.open();
          }}
          className="text-blue-500 hover:text-blue-600 bg-blue-300/20 rounded-full p-2 cursor-pointer"
        >
          <Eye size={16} />
        </button>
      )}

      {updateId && updateModal && (
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
      )}

      {deleteIdState && deleteModal && (
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
      )}
    </div>
  );
};

export default ActionButtons;