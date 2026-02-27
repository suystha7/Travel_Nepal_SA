import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { Plus } from 'lucide-react';
import Modal from '@/components/Modal';
import DeleteModal from '@/components/DeleteModal';
import type { IBreadcrumbListItem } from '../interface/IBreadcrumb';
import { useGetBreadcrumb } from '../hooks/useGetBreadcrumb';
import { useDeleteBreadcrumb } from '../hooks/useDeleteBreadcrumb';
import CreateBreadcrumbModal from '../modal/CreateBreadcrumbModal';
import UpdateBreadcrumbModal from '../modal/UpdateBreadcrumbModal';
import { getColumns } from './BreadcrumbColumns';
import BreadcrumbFilterList from './BreadcrumbFilterList';
import Header from './Header';

const BreadcrumbTable: React.FC = () => {
  const {
    breadcrumbData,
    isLoading,
    isSuccess,
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
  } = useGetBreadcrumb();

  const { deleteModal, deleteIdState, handleDelete, isLoading: isDeleting } = useDeleteBreadcrumb();

  const columns = getColumns({
    breadcrumbData,
    updateId,
    updateModal,
    deleteIdState,
    deleteModal,
  });

  return (
    <div className="flex flex-col flex-1 gap-6 bg-white container-shadow px-6 py-4 rounded-[8px] overflow-y-scroll">
      <div className="flex items-center justify-between">
        <Header />

        <div className="flex justify-end gap-2 items-center">
          <BreadcrumbFilterList setSearch={setSearch} search={search} />
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
        {isSuccess ? (
          <Table<IBreadcrumbListItem>
            columns={columns}
            data={breadcrumbData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPages={breadcrumbData?.data?.totalPages}
            pages={{
              page: breadcrumbData?.data?.currentPage || page,
              pageSize: breadcrumbData?.data?.perPage || pageSize,
              setPage,
              setPageSize,
            }}
            totalItems={breadcrumbData?.data?.totalRecords}
          />
        ) : isLoading ? (
          <LoadingScreen />
        ) : (
          <ErrorMessage />
        )}
      </div>

      <Modal isOpen={createModal.isOpen} name="Create Breadcrumb" onOpenChange={createModal.toggle}>
        <CreateBreadcrumbModal closeModal={createModal.close} />
      </Modal>
      <Modal isOpen={updateModal.isOpen} name="Update Breadcrumb" onOpenChange={updateModal.toggle}>
        <UpdateBreadcrumbModal updateId={updateId.values} closeModal={updateModal.close} />
      </Modal>

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onDelete={handleDelete}
        isLoading={isDeleting}
        primaryMessage="Delete Breadcrumb"
        secondaryMessage="Are you sure you want to delete this breadcrumb? This action cannot be undone."
      />
    </div>
  );
};

export default BreadcrumbTable;
