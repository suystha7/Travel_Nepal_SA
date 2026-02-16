import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { PlusCircle } from 'lucide-react';
import Modal from '@/components/Modal';
import DeleteModal from '@/components/DeleteModal';
import { useGetFAQ } from '../hooks/useGetFAQ';
import type { IFAQListItem } from '../interfaces/IFaq';
import CreateFAQModal from '../modal/CreateFAQModal';
import UpdateFAQModal from '../modal/UpdateFAQModal';
import { useDeleteFAQ } from '../hooks/useDeleteFAQ';
import FAQFilterList from './FAQFilterList';
import { getColumns } from './FAQColumns';

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
    <div className="flex flex-col flex-1 gap-6 bg-white container-shadow mt-4 px-6 py-5 rounded-[8px] overflow-hidden">
      <div className="flex justify-between items-center h-12 gap-4">
        <FAQFilterList setSearch={setSearch} search={search} />

        <button
          onClick={createModal.open}
          className="flex items-center gap-2 px-4 py-3 border border-primary-500 rounded-md cursor-pointer"
        >
          <span className="text-primary-500 typography-semi-bold-extra-small">CREATE</span>
          <PlusCircle className="w-5 h-5 text-primary-500" />
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        {isGetFAQSuccess ? (
          <Table<IFAQListItem>
            columns={columns}
            data={faqData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPage={faqData?.data?.totalPages}
            pages={{
              page: faqData?.data?.currentPage || page,
              pageSize: faqData?.data?.perPage || pageSize,
              setPage: setPage,
              setPageSize: setPageSize,
            }}
            totalItem={faqData?.data?.totalRecords}
            maxHeight="500px"
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
