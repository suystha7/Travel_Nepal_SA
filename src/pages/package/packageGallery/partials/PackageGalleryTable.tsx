import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { PlusCircle } from 'lucide-react';
import Modal from '@/components/Modal';
import type { IPackageGalleryListItem } from '../interface/IPackageGallery';
import { useGetPackageGallery } from '../hooks/useGetPackageGallery';
import { useDeletePackageGallery } from '../hooks/useDeletePackageGallery';
import { getColumns } from './PackageGalleryColumns';
import DeleteModal from '@/components/DeleteModal';
import CreatePackageGalleryModal from '../modal/CreatePackageGalleryModal';
import UpdatePackageGalleryModal from '../modal/UpdatePackageGalleryModal';
import PackageGalleryFilterList from './PackageGalleryFilterList';

const PackageGalleryTable: React.FC = () => {
  const {
    packageGalleryData,
    isLoading: isGetPackageLoading,
    isSuccess: isGetPackageSuccess,
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
  } = useGetPackageGallery();
  const {
    deleteModal,
    deleteIdState,
    isLoading: isDeleteLoading,
    handleDelete,
  } = useDeletePackageGallery();

  const columns = getColumns({
    packageGalleryData,
    updateId,
    updateModal,
    deleteIdState,
    deleteModal,
  });

  return (
    <div className="flex flex-col flex-1 gap-6 bg-white container-shadow mt-4 px-6 py-5 rounded-[8px] overflow-hidden">
      <div className="flex justify-between items-center">
        <PackageGalleryFilterList setSearch={setSearch} search={search} />
        <button
          onClick={createModal.open}
          className="flex items-center gap-2 px-4 py-3 border-[0.6px] border-primary-500 rounded-md cursor-pointer"
        >
          <span className="text-primary-500 typography-semi-bold-extra-small">CREATE</span>
          <PlusCircle className="w-5 h-5 text-primary-500" />
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        {isGetPackageSuccess ? (
          <Table<IPackageGalleryListItem>
            columns={columns}
            data={packageGalleryData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPage={packageGalleryData?.data?.totalPages}
            pages={{
              page: packageGalleryData?.data?.currentPage || page,
              pageSize: packageGalleryData?.data?.perPage || pageSize,
              setPage: setPage,
              setPageSize: setPageSize,
            }}
            totalItem={packageGalleryData?.data?.totalRecords}
            maxHeight="400px"
          />
        ) : isGetPackageLoading ? (
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

      <Modal isOpen={createModal.isOpen} name="Create Gallery" onOpenChange={createModal.toggle}>
        <CreatePackageGalleryModal closeModal={createModal.close} />
      </Modal>

      <Modal isOpen={updateModal.isOpen} name="Update Gallery" onOpenChange={updateModal.toggle}>
        <UpdatePackageGalleryModal updateId={updateId.values} closeModal={updateModal.close} />
      </Modal>
    </div>
  );
};

export default PackageGalleryTable;
