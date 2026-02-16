import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { PlusCircle } from 'lucide-react';
import Modal from '@/components/Modal';
import type { IPackageCategoryListItem } from '../interface/IPackageCategory';
import { useGetPackageCategory } from '../hooks/useGetPackageCategory';
import { useDeletePackageCategory } from '../hooks/useDeletePackageCategory';
import { getColumns } from './PackageCategoryColumns';
import DeleteModal from '@/components/DeleteModal';
import PackageCategoryFilterList from './PackageCategoryFilterList';
import CreatePackageCategoryModal from '../modal/CreatePackageCategoryModal';
import UpdatePackageCategoryModal from '../modal/UpdatePackageCategoryModal';

const PackageCategoryTable: React.FC = () => {
  const {
    packageCategoryData,
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
  } = useGetPackageCategory();

  console.log('opa', packageCategoryData);

  const {
    deleteModal,
    deleteIdState,
    isLoading: isDeleteLoading,
    handleDelete,
  } = useDeletePackageCategory();

  const columns = getColumns({
    packageCategoryData,
    updateId,
    updateModal,
    deleteIdState,
    deleteModal,
  });

  return (
    <div className="flex flex-col flex-1 gap-6 bg-white container-shadow mt-4 px-6 py-5 rounded-[8px] overflow-hidden">
      {/* Table Header */}
      <div className="flex justify-between items-center">
        <PackageCategoryFilterList setSearch={setSearch} search={search} />
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
          <Table<IPackageCategoryListItem>
            columns={columns}
            data={packageCategoryData?.data?.records || ''}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPage={packageCategoryData?.data?.totalPages}
            pages={{
              page: packageCategoryData?.data?.currentPage || page,
              pageSize: packageCategoryData?.data?.perPage || pageSize,
              setPage: setPage,
              setPageSize: setPageSize,
            }}
            totalItem={packageCategoryData?.data?.totalRecords}
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
        name="Create Package Category"
        onOpenChange={createModal.toggle}
      >
        <CreatePackageCategoryModal closeModal={createModal.close} />
      </Modal>

      <Modal
        isOpen={updateModal.isOpen}
        name="Update Package Category"
        onOpenChange={updateModal.toggle}
      >
        <UpdatePackageCategoryModal updateId={updateId.values} closeModal={updateModal.close} />
      </Modal>
    </div>
  );
};

export default PackageCategoryTable;
