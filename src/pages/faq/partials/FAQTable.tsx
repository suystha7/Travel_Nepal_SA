import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { Plus } from 'lucide-react';
import Modal from '@/components/Modal';
import DeleteModal from '@/components/DeleteModal';
import { useGetFAQ } from '../hooks/useGetFAQ';
import type { IFAQListItem } from '../interfaces/IFaq';
import CreateFAQModal from '../modal/CreateFAQModal';
import UpdateFAQModal from '../modal/UpdateFAQModal';
import { useDeleteFAQ } from '../hooks/useDeleteFAQ';
import FAQFilterList from './FAQFilterList';
import { getColumns } from './FAQColumns';
import Header from './Header';

const FAQTable: React.FC = () => {
  const {
    faqData,
    isLoading: isGetFAQLoading,
    isSuccess: isGetFAQSuccess,
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
  } = useGetFAQ();

  const { deleteIdState, deleteModal, isLoading: isDeleteLoading, handleDelete } = useDeleteFAQ();

  const columns = getColumns({
    faqData,
    updateId,
    updateModal,
    deleteIdState,
    deleteModal,
  });

  return (
    <div className="flex flex-col flex-1 gap-6 bg-white container-shadow px-6 py-4 rounded-[8px] overflow-y-scroll">
      <div className="flex items-center justify-between">
        <Header />

        <div className="flex justify-end gap-2 items-center">
          <FAQFilterList setSearch={setSearch} search={search} />
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
        {isGetFAQSuccess ? (
          <Table<IFAQListItem>
            columns={columns}
            data={faqData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPages={faqData?.data?.totalPages}
            pages={{
              page: faqData?.data?.currentPage || page,
              pageSize: faqData?.data?.perPage || pageSize,
              setPage: setPage,
              setPageSize: setPageSize,
            }}
            totalItems={faqData?.data?.totalRecords}
          />
        ) : isGetFAQLoading ? (
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

      <Modal isOpen={createModal.isOpen} name="Create FAQ" onOpenChange={createModal.toggle}>
        <CreateFAQModal closeModal={createModal.close} />
      </Modal>

      <Modal isOpen={updateModal.isOpen} name="Update FAQ" onOpenChange={updateModal.toggle}>
        <UpdateFAQModal updateId={updateId.values} closeModal={updateModal.close} />
      </Modal>
    </div>
  );
};

export default FAQTable;
