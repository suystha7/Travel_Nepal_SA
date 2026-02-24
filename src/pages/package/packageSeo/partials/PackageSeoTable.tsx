import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { PlusCircle } from 'lucide-react';
import Modal from '@/components/Modal';
import type { IPackageSeoListItem } from '../interface/IPackageSeo';
import { getColumns } from './PackageSeoColumns';
import DeleteModal from '@/components/DeleteModal';
import { useGetPackageSeo } from '../hooks/useGetPackageSeo';
import { useDeletePackageSeo } from '../hooks/useDeletePackageSeo';
import PackageSeoFilterList from './PackageSeoFilterList';
import CreatePackageSeoModal from '../modal/CreatePackageSeoModal';
import UpdatePackageSeoModal from '../modal/UpdatePackageSeoModal';

const PackageSeoTable: React.FC = () => {
  const {
    packageSeoData,
    isLoading: isGetPackageSeoLoading,
    isSuccess: isGetPackageSeoSuccess,
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
  } = useGetPackageSeo();

  const {
    deleteModal,
    deleteIdState,
    isLoading: isDeleteLoading,
    handleDelete,
  } = useDeletePackageSeo();

  const columns = getColumns({
    packageSeoData,
    updateId,
    updateModal,
    deleteIdState,
    deleteModal,
  });
  return (
    <div className="flex flex-col flex-1 gap-6 bg-white container-shadow mt-4 px-6 py-5 rounded-[8px] overflow-hidden">
      <div className="flex justify-between items-center h-12 gap-4">
        <PackageSeoFilterList setSearch={setSearch} search={search} />
        <button
          onClick={createModal.open}
          className="flex items-center gap-2 px-4 py-3 border-[0.6px] border-primary-500 rounded-md cursor-pointer"
        >
          <span className="text-primary-500 typography-semi-bold-extra-small">CREATE</span>
          <PlusCircle className="w-5 h-5 text-primary-500" />
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        {isGetPackageSeoSuccess ? (
          <Table<IPackageSeoListItem>
            columns={columns}
            data={packageSeoData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPage={packageSeoData?.data?.totalPages}
            pages={{
              page: packageSeoData?.data?.currentPage || page,
              pageSize: packageSeoData?.data?.perPage || pageSize,
              setPage: setPage,
              setPageSize: setPageSize,
            }}
            totalItem={packageSeoData?.data?.totalRecords}
            maxHeight="500px"
          />
        ) : isGetPackageSeoLoading ? (
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

      <Modal
        isOpen={createModal.isOpen}
        name="Create Package Seo"
        onOpenChange={createModal.toggle}
      >
        <CreatePackageSeoModal closeModal={createModal.close} />
      </Modal>

      <Modal
        isOpen={updateModal.isOpen}
        name="Update Package Seo"
        onOpenChange={updateModal.toggle}
      >
        <UpdatePackageSeoModal updateId={updateId.values} closeModal={updateModal.close} />
      </Modal>
    </div>
  );
};

export default PackageSeoTable;
