import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { Plus } from 'lucide-react';
import Modal from '@/components/Modal';
import { getColumns } from './SocialMediaColumns';
import DeleteModal from '@/components/DeleteModal';
import { useGetSocialMedia } from '../hooks/useGetSocialMedia';
import { useDeleteSocialMedia } from '../hooks/useDeleteSocialMedia';
import type { ISocialMediaSettingsListItem } from '../interface/ISocialMediaSetting';
import CreateSocialMediaModal from '../modal/CreateSocialMediaModal';
import UpdateSocialMediaModal from '../modal/UpdateSocialMediaModal';
import Header from './Header';
import SocialMediaFilterList from './SocialMediaFilterList';

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
    <div className="flex flex-col flex-1 gap-6 bg-white container-shadow mt-4 px-6 py-4 rounded-[8px] overflow-y-scroll">
     <div className="flex items-center justify-between"> 
        <Header />
        <div className="flex justify-end gap-2 items-center">
          <SocialMediaFilterList setSearch={setSearch} search={search} />
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
          <Table<ISocialMediaSettingsListItem>
            columns={columns}
            data={socialMediaData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPages={socialMediaData?.data?.totalPages}
            pages={{
              page: socialMediaData?.data?.currentPage || page,
              pageSize: socialMediaData?.data?.perPage || pageSize,
              setPage: setPage,
              setPageSize: setPageSize,
            }}
            totalItems={socialMediaData?.data?.totalRecords}
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
