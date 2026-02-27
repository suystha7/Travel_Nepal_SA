import Table from '@/components/Table';
import React, { useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { useGetUser } from '../hooks/useGetUser';
import type { IUserListItem } from '../interface/IUser';
import Modal from '@/components/Modal';
import CreateUserModal from '../modal/CreateUserModal';
import UpdateUserModal from '../modal/UpdateUserModal';
import { getColumns, getFilteredSortedUsers } from './UserColumns';
import { useDeleteUser } from '../hooks/useDeleteUser';
import DeleteModal from '@/components/DeleteModal';
import UserFilterList from './UserFilterList';
import { useGetProfile } from '@/pages/accountSettings/profile/hooks/useGetProfile';
import { useResetUserPassword } from '../hooks/useResetPassword';
import { Plus } from 'lucide-react';
import Header from './Header';

const UserTable: React.FC = () => {
  const {
    userData,
    isLoading: isGetUserLoading,
    isSuccess: isGetUserSuccess,
    createModal,
    updateId,
    updateModal,
    page,
    pageSize,
    setPage,
    setPageSize,
    rowSelection,
    setRowSelection,
    search,
    setSearch,
  } = useGetUser();

  const { deleteModal, deleteIdState, handleDelete, isLoading: isDeleteLoading } = useDeleteUser();

  const { profileData } = useGetProfile();

  const [resetUserId, setResetUserId] = useState<string | null>(null);

  const selectedEmail = userData?.data?.records?.find(u => u.id === resetUserId)?.email ?? '';

  const openResetModal = (id: string) => setResetUserId(id);
  const closeResetModal = () => setResetUserId(null);

  const { handleReset, isLoading: isResetLoading } = useResetUserPassword({
    onSuccess: closeResetModal,
  });

  const columns = getColumns({
    userData,
    updateId,
    updateModal,
    deleteIdState,
    deleteModal,
    isSuperuser: profileData?.data?.is_superadmin,
    isAdmin: profileData?.data?.is_admin,
    onResetPassword: openResetModal,
    currentUserId: profileData?.data?.id,
  });

  return (
    <div className="flex flex-col flex-1 gap-6 bg-white container-shadow px-6 py-4 rounded-[8px] overflow-y-scroll">
      <div className="flex items-center justify-between">
        <Header />

        <div className="flex justify-end gap-2 items-center">
          <UserFilterList setSearch={setSearch} search={search} />
          <button
            onClick={createModal.open}
            className="flex items-center gap-2 px-4 py-2 cursor-pointer bg-primary-400 text-white rounded-full"
          >
            <Plus className="w-5 h-5" />
            <span className="typography-semi-bold-extra-small">Add</span>
          </button>
        </div>
      </div>

      <div className="flex">
        {isGetUserSuccess ? (
          <Table<IUserListItem>
            data={getFilteredSortedUsers(userData?.data?.records?.filter(u => u.role !== 'user'))}
            columns={columns}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPages={userData?.data?.totalPages}
            pages={{
              page: userData?.data?.currentPage || page,
              pageSize: userData?.data?.perPage || pageSize,
              setPage,
              setPageSize,
            }}
            totalItems={userData?.data?.totalRecords}
          />
        ) : isGetUserLoading ? (
          <LoadingScreen />
        ) : (
          <ErrorMessage />
        )}
      </div>

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onDelete={handleDelete}
        isLoading={isDeleteLoading}
        secondaryMessage="Are you sure you want to delete this user? This action cannot be undone."
      />

      <Modal isOpen={createModal.isOpen} name="Create User" onOpenChange={createModal.toggle}>
        <CreateUserModal closeModal={createModal.close} />
      </Modal>

      <Modal isOpen={updateModal.isOpen} name="Update User" onOpenChange={updateModal.toggle}>
        <UpdateUserModal updateId={updateId.values} closeModal={updateModal.close} />
      </Modal>

      <Modal isOpen={!!resetUserId} name="Reset Password" onOpenChange={closeResetModal}>
        <div className="space-y-5">
          <p className="text-base">Do you want to reset the password for {selectedEmail}?</p>

          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={closeResetModal}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm"
            >
              Cancel
            </button>

            <button
              onClick={() => handleReset()}
              className="px-4 py-2 bg-primary-500 text-white rounded-md text-sm cursor-pointer disabled:opacity-50"
              disabled={isResetLoading}
            >
              Reset Password
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserTable;
