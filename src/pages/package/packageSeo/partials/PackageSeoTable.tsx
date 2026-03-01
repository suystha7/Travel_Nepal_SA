import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import Modal from '@/components/Modal';
import type { IPackageSeoListItem } from '../interface/IPackageSeo';
import { getColumns } from './PackageSeoColumns';
import DeleteModal from '@/components/DeleteModal';
import { useGetPackageSeo } from '../hooks/useGetPackageSeo';
import { useDeletePackageSeo } from '../hooks/useDeletePackageSeo';
import PackageSeoFilterList from './PackageSeoFilterList';
import CreatePackageSeoModal from '../modal/CreatePackageSeoModal';
import UpdatePackageSeoModal from '../modal/UpdatePackageSeoModal';
import { Plus } from 'lucide-react';
import Header from './Header';

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
    <div className="flex flex-col flex-1 gap-6 bg-white container-shadow  mt-4 px-6 py-4 rounded-[8px] overflow-y-scroll">
     <div className="flex items-center justify-between">
        <Header />

        <div className="flex justify-end gap-2 items-center">
          <PackageSeoFilterList setSearch={setSearch} search={search} />
          <button
            onClick={createModal.open}
            className="flex items-center gap-2 px-4 py-2 cursor-pointer bg-primary-500 text-white rounded-md"
          >
            <Plus className="w-5 h-5" />
            <span className="typography-semi-bold-extra-small">Add</span>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center">
        {isGetPackageSeoSuccess ? (
          <Table<IPackageSeoListItem>
            columns={columns}
            data={packageSeoData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPages={packageSeoData?.data?.totalPages}
            pages={{
              page: packageSeoData?.data?.currentPage || page,
              pageSize: packageSeoData?.data?.perPage || pageSize,
              setPage: setPage,
              setPageSize: setPageSize,
            }}
            totalItems={packageSeoData?.data?.totalRecords}
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
