import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { PlusCircle } from 'lucide-react';
import Modal from '@/components/Modal';
import { useGetPolicy } from '../hooks/useGetPolicy';
import type { IPolicyListItem } from '../interface/IPolicy';
import { useDeletePolicy } from '../hooks/useDeletePolicy';
import CreatePolicyModal from '../modal/CreatePolicyModal';
import UpdatePolicyModal from '../modal/UpdatePolicyModal';
import { getColumns } from './PolicyColumns';
import DeleteModal from '@/components/DeleteModal';
import PolicyFilterList from './PolicyFilterList';

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
    <div className="flex flex-col flex-1 gap-6 bg-white container-shadow mt-4 px-6 py-5 rounded-[8px] overflow-hidden">
      {/* Table Header */}
      <div className="flex justify-between items-center">
        <PolicyFilterList setSearch={setSearch} search={search} />

        <button
          onClick={createModal.open}
          className="flex items-center gap-2 px-4 py-3 border-[0.6px] border-primary-500 rounded-md cursor-pointer"
        >
          <span className="text-primary-500 typography-semi-bold-extra-small">CREATE</span>
          <PlusCircle className="text-primary-500" size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        {isGetPolicySuccess ? (
          <Table<IPolicyListItem>
            columns={columns}
            data={policyData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPage={policyData?.data?.totalPages}
            pages={{
              page: policyData?.data?.currentPage || page,
              pageSize: policyData?.data?.perPage || pageSize,
              setPage: setPage,
              setPageSize: setPageSize,
            }}
            totalItem={policyData?.data?.totalRecords}
            maxHeight="500px"
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
