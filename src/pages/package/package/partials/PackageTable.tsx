import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { PlusCircle } from 'lucide-react';
import PackageModal from '@/components/PackageModal';
import { useGetPackage } from '../hooks/useGetPackage';
import CreatePackageModal from '../modal/CreatePackageModal';
import UpdatePackageModal from '../modal/UpdatePackageModal';
import { useDeletePackage } from '../hooks/useDeletePackage';
import { getColumns } from './PackageColumns';
import DeleteModal from '@/components/DeleteModal';
import PackageFilterList from './PackageFilterList';
import type { IPackageData } from '../interface/IPackage';

const PackageTable: React.FC = () => {
  const {
    packageData,
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
  } = useGetPackage();

  const {
    deleteModal,
    deleteIdState,
    isLoading: isDeleteLoading,
    handleDelete,
  } = useDeletePackage();

  const columns = getColumns({
    packageData,
    updateId,
    updateModal,
    deleteIdState,
    deleteModal,
  });
  return (
    <div className="flex flex-col flex-1 gap-6 bg-white container-shadow mt-4 px-6 py-5 rounded-[8px] overflow-hidden">
      <div className="flex items-center justify-between">
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
          <Table<IPackageData>
            columns={columns}
            data={packageData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPage={packageData?.data?.totalPages}
            pages={{
              page: packageData?.data?.currentPage || page,
              pageSize: packageData?.data?.perPage || pageSize,
              setPage: setPage,
              setPageSize: setPageSize,
            }}
            totalItem={packageData?.data?.totalRecords}
            maxHeight="450px"
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

      <PackageModal
        isOpen={createModal.isOpen}
        name="Create Package"
        onOpenChange={createModal.toggle}
      >
        <CreatePackageModal closeModal={createModal.close} />
      </PackageModal>

      <PackageModal
        isOpen={updateModal.isOpen}
        name="Update Package"
        onOpenChange={updateModal.toggle}
      >
        <UpdatePackageModal updateId={updateId.values} closeModal={updateModal.close} />
      </PackageModal>
    </div>
  );
};

export default PackageTable;
