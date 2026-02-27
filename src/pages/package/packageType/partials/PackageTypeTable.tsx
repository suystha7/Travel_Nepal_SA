import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { Plus } from 'lucide-react';
import Modal from '@/components/Modal';
import type { IPackageTypeListItem } from '../interface/IPackageType';
import { useGetPackageType } from '../hooks/useGetPackageType';
import CreatePackageTypeModal from '../modal/CreatePackageTypeModal';
import { useDeletePackageType } from '../hooks/useDeletePackageType';
import { getColumns } from './PackageTypeColumns';
import DeleteModal from '@/components/DeleteModal';
import PackageTypeFilterList from './PackageTypeFilterList';
import UpdatePackageTypeModal from '../modal/UpdatePackageTypeModal';
import Header from './Header';

const PackageTypeTable: React.FC = () => {
  const {
    packageTypeData,
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
  } = useGetPackageType();

  const {
    deleteModal,
    deleteIdState,
    isLoading: isDeleteLoading,
    handleDelete,
  } = useDeletePackageType();

  const columns = getColumns({
    packageTypeData,
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
          <PackageTypeFilterList setSearch={setSearch} search={search} />
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
          <Table<IPackageTypeListItem>
            columns={columns}
            data={packageTypeData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPages={packageTypeData?.data?.totalPages}
            pages={{
              page: packageTypeData?.data?.currentPage || page,
              pageSize: packageTypeData?.data?.perPage || pageSize,
              setPage: setPage,
              setPageSize: setPageSize,
            }}
            totalItems={packageTypeData?.data?.totalRecords}
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

      <Modal
        isOpen={createModal.isOpen}
        name="Create Package Type"
        onOpenChange={createModal.toggle}
      >
        <CreatePackageTypeModal closeModal={createModal.close} />
      </Modal>

      <Modal
        isOpen={updateModal.isOpen}
        name="Update Package Type"
        onOpenChange={updateModal.toggle}
      >
        <UpdatePackageTypeModal updateId={updateId.values} closeModal={updateModal.close} />
      </Modal>
    </div>
  );
};

export default PackageTypeTable;
