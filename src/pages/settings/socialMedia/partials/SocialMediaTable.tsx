import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { PlusCircle } from 'lucide-react';
import Modal from '@/components/Modal';
import { getColumns } from './SocialMediaColumns';
import DeleteModal from '@/components/DeleteModal';
import PackageFilterList from './SocialMediaFilterList';
import { useGetSocialMedia } from '../hooks/useGetSocialMedia';
import { useDeleteSocialMedia } from '../hooks/useDeleteSocialMedia';
import type { ISocialMediaSettingsListItem } from '../interface/ISocialMediaSetting';
import CreateSocialMediaModal from '../modal/CreateSocialMediaModal';
import UpdateSocialMediaModal from '../modal/UpdateSocialMediaModal';

const SocialMediaTable: React.FC = () => {
  const {
    socialMediaData,
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
  } = useGetSocialMedia();

  const {
    deleteModal,
    deleteIdState,
    isLoading: isDeleteLoading,
    handleDelete,
  } = useDeleteSocialMedia();

  const columns = getColumns({
    socialMediaData,
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
          <Table<ISocialMediaSettingsListItem>
            columns={columns}
            data={socialMediaData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPage={socialMediaData?.data?.totalPages}
            pages={{
              page: socialMediaData?.data?.currentPage || page,
              pageSize: socialMediaData?.data?.perPage || pageSize,
              setPage: setPage,
              setPageSize: setPageSize,
            }}
            totalItem={socialMediaData?.data?.totalRecords}
            maxHeight="500px"
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
        name="Create Package Inclusion"
        onOpenChange={createModal.toggle}
      >
        <CreateSocialMediaModal closeModal={createModal.close} />
      </Modal>

      <Modal
        isOpen={updateModal.isOpen}
        name="Update Package Inclusion"
        onOpenChange={updateModal.toggle}
      >
        <UpdateSocialMediaModal updateId={updateId.values} closeModal={updateModal.close} />
      </Modal>
    </div>
  );
};

export default SocialMediaTable;
