import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { PlusCircle } from 'lucide-react';
import Modal from '@/components/Modal';
import type { IPackageTypeListItem } from '../interface/IPackageType';
import { useGetPackageType } from '../hooks/useGetPackageType';
import CreatePackageTypeModal from '../modal/CreatePackageTypeModal';
import { useDeletePackageType } from '../hooks/useDeletePackageType';
import { getColumns } from './PackageTypeColumns';
import DeleteModal from '@/components/DeleteModal';
import PackageFilterList from './PackageFilterList';
import UpdatePackageTypeModal from '../modal/UpdatePackageTypeModal';

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
    <div className="flex flex-col flex-1 gap-6 bg-white container-shadow mt-4 px-6 py-5 rounded-[8px] overflow-hidden">
      {/* Table Header */}
      <div className="flex justify-between items-center">
        <PackageFilterList setSearch={setSearch} search={search} />
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
          <Table<IPackageTypeListItem>
            columns={columns}
            data={packageTypeData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPage={packageTypeData?.data?.totalPages}
            pages={{
              page: packageTypeData?.data?.currentPage || page,
              pageSize: packageTypeData?.data?.perPage || pageSize,
              setPage: setPage,
              setPageSize: setPageSize,
            }}
            totalItem={packageTypeData?.data?.totalRecords}
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
