import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { Plus } from 'lucide-react';
import Modal from '@/components/Modal';
import { getColumns } from './PackageImageSeoColumns';
import DeleteModal from '@/components/DeleteModal';
import { useGetPackageImageSeo } from '../hooks/useGetPackageImageSeo';
import { useDeletePackageImageSeo } from '../hooks/useDeletePackageImageSeo';
import type { IPackageImageSeoListItem } from '../interface/IPackageImageSeo';
import CreatePackageImageSeoModal from '../modal/CreatePackageImageSeoModal';
import UpdatePackageImageSeoModal from '../modal/UpdatePackageImageSeoModal';
import PackageImageSeoFilterList from './PackageImageSeoFilterList';
import Header from './Header';

const PackageImageSeoTable: React.FC = () => {
  const {
    packageImageSeoData,
    isLoading: isGetPackageImageSeoLoading,
    isSuccess: isGetPackageImageSeoSuccess,
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
  } = useGetPackageImageSeo();

  const {
    deleteModal,
    deleteIdState,
    isLoading: isDeleteLoading,
    handleDelete,
  } = useDeletePackageImageSeo();

  const columns = getColumns({
    packageImageSeoData,
    updateId,
    updateModal,
    deleteIdState,
    deleteModal,
  });

  return (
    <div className="flex flex-col flex-1 gap-6 bg-white container-shadow mt-4 px-6 py-4 rounded-[8px] overflow-y-scroll">
     <div className="flex items-center justify-between">
        <Header />

        <div className="flex justify-end gap-2 items-center">
          <PackageImageSeoFilterList setSearch={setSearch} search={search} />
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
        {isGetPackageImageSeoSuccess ? (
          <Table<IPackageImageSeoListItem>
            columns={columns}
            data={packageImageSeoData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPages={packageImageSeoData?.data?.totalPages}
            pages={{
              page: packageImageSeoData?.data?.currentPage || page,
              pageSize: packageImageSeoData?.data?.perPage || pageSize,
              setPage: setPage,
              setPageSize: setPageSize,
            }}
            totalItems={packageImageSeoData?.data?.totalRecords}
          />
        ) : isGetPackageImageSeoLoading ? (
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

      <Modal isOpen={createModal.isOpen} name="Create Package Image Seo" onOpenChange={createModal.toggle}>
        <CreatePackageImageSeoModal closeModal={createModal.close} />
      </Modal>

      <Modal isOpen={updateModal.isOpen} name="Update Package Image Seo" onOpenChange={updateModal.toggle}>
        <UpdatePackageImageSeoModal updateId={updateId.values} closeModal={updateModal.close} />
      </Modal>
    </div>
  );
};

export default PackageImageSeoTable;
