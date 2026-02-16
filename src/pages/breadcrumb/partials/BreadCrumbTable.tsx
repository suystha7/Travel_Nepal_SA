import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { PlusCircle } from 'lucide-react';
import Modal from '@/components/Modal';
import DeleteModal from '@/components/DeleteModal';
import type { IBreadcrumbListItem } from '../interface/IBreadcrumb';
import { useGetBreadcrumb } from '../hooks/useGetBreadcrumb';
import { useDeleteBreadcrumb } from '../hooks/useDeleteBreadcrumb';
import CreateBreadcrumbModal from '../modal/CreateBreadcrumbModal';
import UpdateBreadcrumbModal from '../modal/UpdateBreadcrumbModal';
import { getColumns } from './BreadcrumbColumns';
import BreadcrumbFilterList from './BreadcrumbFilterList';

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
    <div className="flex flex-col flex-1 gap-6 bg-white container-shadow mt-4 px-6 py-5 rounded-[8px] overflow-hidden">
      <div className="flex items-center justify-between h-12 gap-4">
        <BreadcrumbFilterList setSearch={setSearch} search={search} />
        <button
          onClick={createModal.open}
          className="flex items-center gap-2 px-4 py-3 border rounded-md cursor-pointer border-primary-500"
        >
          <span className="text-primary-500 typography-semi-bold-extra-small">CREATE</span>
          <PlusCircle className="w-5 h-5 text-primary-500" />
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        {isSuccess ? (
          <Table<IBreadcrumbListItem>
            columns={columns}
            data={breadcrumbData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPage={breadcrumbData?.data?.totalPages}
            pages={{
              page: breadcrumbData?.data?.currentPage || page,
              pageSize: breadcrumbData?.data?.perPage || pageSize,
              setPage,
              setPageSize,
            }}
            totalItem={breadcrumbData?.data?.totalRecords}
            maxHeight="500px"
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
