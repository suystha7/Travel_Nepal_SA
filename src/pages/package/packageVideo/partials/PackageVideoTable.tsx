import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { Plus } from 'lucide-react';
import Modal from '@/components/Modal';
import type { IPackageVideoListItem } from '../interface/IPackageVideo';
import { useGetPackageVideo } from '../hooks/useGetPackageVideo';
import CreatePackageVideoModal from '../modal/CreatePackageVideoModal';
import UpdatePackageVideoModal from '../modal/UpdatePackageVideoModal';
import { useDeletePackageVideo } from '../hooks/useDeletePackageVideo';
import { getColumns } from './PackageVideoColumns';
import DeleteModal from '@/components/DeleteModal';
import PackageVideoFilterList from './PackageVideoFilterList';
import Header from './Header';

const PackageVideoTable: React.FC = () => {
  const {
    packageVideoData,
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
  } = useGetPackageVideo();

  const {
    deleteModal,
    deleteIdState,
    isLoading: isDeleteLoading,
    handleDelete,
  } = useDeletePackageVideo();

  const columns = getColumns({
    packageVideoData,
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
          <PackageVideoFilterList setSearch={setSearch} search={search} />
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
          <Table<IPackageVideoListItem>
            columns={columns}
            data={packageVideoData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPages={packageVideoData?.data?.totalPages}
            pages={{
              page: packageVideoData?.data?.currentPage || page,
              pageSize: packageVideoData?.data?.perPage || pageSize,
              setPage: setPage,
              setPageSize: setPageSize,
            }}
            totalItems={packageVideoData?.data?.totalRecords}
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

      <Modal isOpen={createModal.isOpen} name="Create Video" onOpenChange={createModal.toggle}>
        <CreatePackageVideoModal closeModal={createModal.close} />
      </Modal>

      <Modal isOpen={updateModal.isOpen} name="Update Video" onOpenChange={updateModal.toggle}>
        <UpdatePackageVideoModal updateId={updateId.values} closeModal={updateModal.close} />
      </Modal>
    </div>
  );
};

export default PackageVideoTable;
