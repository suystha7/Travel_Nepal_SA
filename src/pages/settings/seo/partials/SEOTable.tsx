import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { Plus } from 'lucide-react';
import Modal from '@/components/Modal';
import AlertModal from '@/components/DeleteModal';
import { useGetSEO } from '../hooks/useGetSEO';
import type { IStaticSEOListItem } from '../interface/IStaticSEO';
import { useDeleteSEO } from '../hooks/useDeleteSEO';
import CreateSEOModal from '../modal/CreateSEOModal';
import UpdateSEOModal from '../modal/UpdateSEOModal';
import { getColumns } from './SEOColumns';
import SEOFilterList from './SEOFilterList';
import Header from './Header';

const SEOTable: React.FC = () => {
  const {
    seoData,
    isLoading: isGetSEOLoading,
    isSuccess: isGetSEOSuccess,
    createModal,
    updateId,
    updateModal,
    page,
    pageSize,
    setPage,
    setPageSize,
    setRowSelection,
    rowSelection,
    search,
    setSearch,
  } = useGetSEO();

  const { deleteIdState, deleteModal, isLoading: isDeleteLoading, handleDelete } = useDeleteSEO();

  const columns = getColumns({ seoData, updateId, updateModal, deleteIdState, deleteModal });

  return (
    <div className="flex flex-col flex-1 gap-6 bg-white container-shadow mt-4 px-6 py-4 rounded-[8px] overflow-y-scroll">
      <div className="flex items-center justify-between">
        <Header />

        <div className="flex justify-end gap-2 items-center">
          <SEOFilterList setSearch={setSearch} search={search} />
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
        {isGetSEOSuccess ? (
          <Table<IStaticSEOListItem>
            columns={columns}
            data={seoData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPages={seoData?.data?.totalPages}
            pages={{
              page: seoData?.data?.currentPage || page,
              pageSize: seoData?.data?.perPage || pageSize,
              setPage: setPage,
              setPageSize: setPageSize,
            }}
            totalItems={seoData?.data?.totalRecords}
          />
        ) : isGetSEOLoading ? (
          <LoadingScreen />
        ) : (
          <ErrorMessage />
        )}
      </div>

      <AlertModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onDelete={handleDelete}
        isLoading={isDeleteLoading}
      />
      <Modal isOpen={createModal.isOpen} name="Create SEO" onOpenChange={createModal.toggle}>
        <CreateSEOModal closeModal={createModal.close} />
      </Modal>

      <Modal isOpen={updateModal.isOpen} name="Update SEO" onOpenChange={updateModal.toggle}>
        <UpdateSEOModal updateId={updateId.values} closeModal={updateModal.close} />
      </Modal>
    </div>
  );
};

export default SEOTable;
