import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { Plus } from 'lucide-react';
import Modal from '@/components/Modal';
import type { IPackageGalleryListItem } from '../interface/IPackageGallery';
import { useGetPackageGallery } from '../hooks/useGetPackageGallery';
import { useDeletePackageGallery } from '../hooks/useDeletePackageGallery';
import { getColumns } from './PackageGalleryColumns';
import DeleteModal from '@/components/DeleteModal';
import CreatePackageGalleryModal from '../modal/CreatePackageGalleryModal';
import UpdatePackageGalleryModal from '../modal/UpdatePackageGalleryModal';
import PackageGalleryFilterList from './PackageGalleryFilterList';
import Header from './Header';

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
    <div className="flex flex-col flex-1 gap-6 bg-white container-shadow mt-4 px-6 py-4 rounded-[8px] overflow-y-scroll">
     <div className="flex items-center justify-between">
        <Header />

        <div className="flex justify-end gap-2 items-center">
          <PackageGalleryFilterList setSearch={setSearch} search={search} />
          <button
            onClick={createModal.open}
            className="flex items-center gap-2 px-4 py-2 cursor-pointer bg-primary-400 text-white rounded-full"
          >
            <Plus className="w-5 h-5" />
            <span className="typography-semi-bold-extra-small">Add</span>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center">
        {isGetPackageSuccess ? (
          <Table<IPackageGalleryListItem>
            columns={columns}
            data={packageGalleryData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPages={packageGalleryData?.data?.totalPages}
            pages={{
              page: packageGalleryData?.data?.currentPage || page,
              pageSize: packageGalleryData?.data?.perPage || pageSize,
              setPage: setPage,
              setPageSize: setPageSize,
            }}
            totalItems={packageGalleryData?.data?.totalRecords}
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
