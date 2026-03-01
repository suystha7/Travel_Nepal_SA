import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { Plus } from 'lucide-react';
import Modal from '@/components/Modal';
import type { IPackageCategoryListItem } from '../interface/IPackageCategory';
import { useGetPackageCategory } from '../hooks/useGetPackageCategory';
import { useDeletePackageCategory } from '../hooks/useDeletePackageCategory';
import { getColumns } from './PackageCategoryColumns';
import DeleteModal from '@/components/DeleteModal';
import PackageCategoryFilterList from './PackageCategoryFilterList';
import CreatePackageCategoryModal from '../modal/CreatePackageCategoryModal';
import UpdatePackageCategoryModal from '../modal/UpdatePackageCategoryModal';
import Header from './Header';

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
    <div className="flex flex-col flex-1 gap-6 bg-white container-shadow mt-4 px-6 py-4 rounded-[8px] overflow-y-scroll">
      <div className="flex items-center justify-between">
        <Header />

        <div className="flex justify-end gap-2 items-center">
          <PackageCategoryFilterList setSearch={setSearch} search={search} />
          <button
            onClick={createModal.open}
            className="flex items-center gap-2 px-4 py-2 cursor-pointer bg-primary-500 text-white rounded-md"
          >
            <Plus className="w-5 h-5" />
            <span className="typography-semi-bold-extra-small">Add</span>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center">
        {isGetPackageSuccess ? (
          <Table<IPackageCategoryListItem>
            columns={columns}
            data={packageCategoryData?.data?.records || ''}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPages={packageCategoryData?.data?.totalPages}
            pages={{
              page: packageCategoryData?.data?.currentPage || page,
              pageSize: packageCategoryData?.data?.perPage || pageSize,
              setPage: setPage,
              setPageSize: setPageSize,
            }}
            totalItems={packageCategoryData?.data?.totalRecords}
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
