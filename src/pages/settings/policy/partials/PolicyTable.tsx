import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { Plus } from 'lucide-react';
import Modal from '@/components/Modal';
import { useGetPolicy } from '../hooks/useGetPolicy';
import type { IPolicyListItem } from '../interface/IPolicy';
import { useDeletePolicy } from '../hooks/useDeletePolicy';
import CreatePolicyModal from '../modal/CreatePolicyModal';
import UpdatePolicyModal from '../modal/UpdatePolicyModal';
import { getColumns } from './PolicyColumns';
import DeleteModal from '@/components/DeleteModal';
import PolicyFilterList from './PolicyFilterList';
import Header from './Header';

const PolicyTable: React.FC = () => {
  const {
    policyData,
    isLoading: isGetPolicyLoading,
    isSuccess: isGetPolicySuccess,
    createModal,
    updateId,
    updateModal,
    page,
    setPage,
    pageSize,
    setPageSize,
    rowSelection,
    setRowSelection,
    search,
    setSearch,
  } = useGetPolicy();

  const {
    deleteIdState,
    deleteModal,
    isLoading: isDeleteLoading,
    handleDelete,
  } = useDeletePolicy();

  const columns = getColumns({ policyData, updateId, updateModal, deleteIdState, deleteModal });

  return (
    <div className="flex flex-col flex-1 gap-6 bg-white container-shadow mt-4 px-6 py-4 rounded-[8px] overflow-y-scroll">
      <div className="flex items-center justify-between">
        <Header />

        <div className="flex justify-end gap-2 items-center">
          <PolicyFilterList setSearch={setSearch} search={search} />
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
        {isGetPolicySuccess ? (
          <Table<IPolicyListItem>
            columns={columns}
            data={policyData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPages={policyData?.data?.totalPages}
            pages={{
              page: policyData?.data?.currentPage || page,
              pageSize: policyData?.data?.perPage || pageSize,
              setPage: setPage,
              setPageSize: setPageSize,
            }}
            totalItems={policyData?.data?.totalRecords}
          />
        ) : isGetPolicyLoading ? (
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
      />

      <Modal isOpen={createModal.isOpen} name="Create Policy" onOpenChange={createModal.toggle}>
        <CreatePolicyModal closeModal={createModal.close} />
      </Modal>

      <Modal isOpen={updateModal.isOpen} name="Update Policy" onOpenChange={updateModal.toggle}>
        <UpdatePolicyModal updateId={updateId.values} closeModal={updateModal.close} />
      </Modal>
    </div>
  );
};

export default PolicyTable;
