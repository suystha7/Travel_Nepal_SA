import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { PlusCircle } from 'lucide-react';
import Modal from '@/components/Modal';
import type { IPackageVideoListItem } from '../interface/IPackageVideo';
import { useGetPackageVideo } from '../hooks/useGetPackageVideo';
import CreatePackageVideoModal from '../modal/CreatePackageVideoModal';
import UpdatePackageVideoModal from '../modal/UpdatePackageVideoModal';
import { useDeletePackageVideo } from '../hooks/useDeletePackageVideo';
import { getColumns } from './PackageVideoColumns';
import DeleteModal from '@/components/DeleteModal';
import PackageVideoFilterList from './PackageVideoFilterList';

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
    <div className="flex flex-col flex-1 gap-6 bg-white container-shadow mt-4 px-6 py-5 rounded-[8px] overflow-hidden">
      {/* Table Header */}
      <div className="flex justify-between items-center">
        <PackageVideoFilterList setSearch={setSearch} search={search} />
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
          <Table<IPackageVideoListItem>
            columns={columns}
            data={packageVideoData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPage={packageVideoData?.data?.totalPages}
            pages={{
              page: packageVideoData?.data?.currentPage || page,
              pageSize: packageVideoData?.data?.perPage || pageSize,
              setPage: setPage,
              setPageSize: setPageSize,
            }}
            totalItem={packageVideoData?.data?.totalRecords}
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
