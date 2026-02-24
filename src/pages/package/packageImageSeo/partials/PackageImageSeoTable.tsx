import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { PlusCircle } from 'lucide-react';
import Modal from '@/components/Modal';
import { getColumns } from './PackageImageSeoColumns';
import DeleteModal from '@/components/DeleteModal';
import { useGetPackageImageSeo } from '../hooks/useGetPackageImageSeo';
import { useDeletePackageImageSeo } from '../hooks/useDeletePackageImageSeo';
import type { IPackageImageSeoListItem } from '../interface/IPackageImageSeo';
import CreatePackageImageSeoModal from '../modal/CreatePackageImageSeoModal';
import UpdatePackageImageSeoModal from '../modal/UpdatePackageImageSeoModal';
import PackageImageSeoFilterList from './PackageImageSeoFilterList';

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
    <div className="flex flex-col flex-1 gap-6 bg-white container-shadow mt-4 px-6 py-5 rounded-[8px] overflow-hidden">
      <div className="flex justify-between items-center h-12 gap-4">
        <PackageImageSeoFilterList setSearch={setSearch} search={search} />
        <button
          onClick={createModal.open}
          className="flex items-center gap-2 px-4 py-3 border-[0.6px] border-primary-500 rounded-md cursor-pointer"
        >
          <span className="text-primary-500 typography-semi-bold-extra-small">CREATE</span>
          <PlusCircle className="w-5 h-5 text-primary-500" />
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        {isGetPackageImageSeoSuccess ? (
          <Table<IPackageImageSeoListItem>
            columns={columns}
            data={packageImageSeoData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPage={packageImageSeoData?.data?.totalPages}
            pages={{
              page: packageImageSeoData?.data?.currentPage || page,
              pageSize: packageImageSeoData?.data?.perPage || pageSize,
              setPage: setPage,
              setPageSize: setPageSize,
            }}
            totalItem={packageImageSeoData?.data?.totalRecords}
            maxHeight="400px"
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
