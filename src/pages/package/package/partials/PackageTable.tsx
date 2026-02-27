import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { Plus } from 'lucide-react';
import PackageModal from '@/components/PackageModal';
import { useGetPackage } from '../hooks/useGetPackage';
import CreatePackageModal from '../modal/CreatePackageModal';
import UpdatePackageModal from '../modal/UpdatePackageModal';
import { useDeletePackage } from '../hooks/useDeletePackage';
import { getColumns } from './PackageColumns';
import DeleteModal from '@/components/DeleteModal';
import PackageFilterList from './PackageFilterList';
import type { IPackageData } from '../interface/IPackage';
import Header from './Header';

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
    <div className="flex flex-col flex-1 gap-6 bg-white container-shadow mt-4 px-6 py-4 rounded-[8px] overflow-y-scroll">
      <div className="flex it ems-center justify-between">
        <Header />

        <div className="flex justify-end gap-2 items-center">
          <PackageFilterList setSearch={setSearch} search={search} />
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
        {isGetPackageSuccess ? (
          <Table<IPackageData>
            columns={columns}
            data={packageData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPages={packageData?.data?.totalPages}
            pages={{
              page: packageData?.data?.currentPage || page,
              pageSize: packageData?.data?.perPage || pageSize,
              setPage: setPage,
              setPageSize: setPageSize,
            }}
            totalItems={packageData?.data?.totalRecords}
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
