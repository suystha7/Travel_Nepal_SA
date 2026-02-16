import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { PlusCircle } from 'lucide-react';
import Modal from '@/components/Modal';
import AlertModal from '@/components/DeleteModal';
import { useGetSEO } from '../hooks/useGetSEO';
import type { IStaticSEOListItem } from '../interface/IStaticSEO';
import { useDeleteSEO } from '../hooks/useDeleteSEO';
import CreateSEOModal from '../modal/CreateSEOModal';
import UpdateSEOModal from '../modal/UpdateSEOModal';
import { getColumns } from './SEOColumns';
import SEOFilterList from './SEOFilterList';

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
    <div className="flex flex-col flex-1 gap-6 bg-white container-shadow mt-4 px-6 py-5 rounded-[8px] overflow-hidden">
      <div className="flex justify-between items-center">
        <SEOFilterList setSearch={setSearch} search={search} />

        <button
          onClick={createModal.open}
          className="flex items-center gap-2 px-4 py-3 border-[0.6px] border-primary-500 rounded-md cursor-pointer"
        >
          <span className="text-primary-500 typography-semi-bold-extra-small">CREATE</span>
          <PlusCircle className="text-primary-500" size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        {isGetSEOSuccess ? (
          <Table<IStaticSEOListItem>
            columns={columns}
            data={seoData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPage={seoData?.data?.totalPages}
            pages={{
              page: seoData?.data?.currentPage || page,
              pageSize: seoData?.data?.perPage || pageSize,
              setPage: setPage,
              setPageSize: setPageSize,
            }}
            totalItem={seoData?.data?.totalRecords}
            maxHeight="500px"
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
