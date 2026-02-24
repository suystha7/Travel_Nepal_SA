import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { PlusCircle } from 'lucide-react';
import Modal from '@/components/Modal';
import { useGetTestimonial } from '../hooks/useGetTestimonial';
import { getColumns } from './TestimonialColumns';
import CreateTestimonialModal from '../modal/CreateTestimonialModal';
import UpdateTestimonialModal from '../modal/UpdateTestimonialModal';
import { useDeleteTestimonial } from '../hooks/useDeleteTestimonial';
import DeleteModal from '@/components/DeleteModal';
import TestimonialFilterList from './TestimonialFilterList';
import type { ITestimonialItem } from '../interface/ITestimonial';

const TestimonialTable: React.FC = () => {
  const {
    testimonialData,
    isLoading,
    isSuccess,
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
  } = useGetTestimonial();

  const {
    deleteModal,
    deleteIdState,
    isLoading: isDeleteLoading,
    handleDelete,
  } = useDeleteTestimonial();

  const columns = getColumns({
    testimonialData,
    updateId,
    updateModal,
    deleteIdState,
    deleteModal,
  });

  return (
    <div className="flex flex-col flex-1 gap-6 bg-white container-shadow mt-4 px-6 py-5 rounded-md-[8px] overflow-hidden">
      <div className="flex items-center justify-between h-12 gap-4">
        <TestimonialFilterList setSearch={setSearch} search={search} />
        <button
          onClick={createModal.open}
          className="flex items-center gap-2 px-4 py-3 border border-primary-500 rounded-md cursor-pointer"
        >
          <span className="text-primary-500 typography-semi-bold-extra-small">CREATE</span>
          <PlusCircle className="w-4 h-4 text-primary-500" />
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        {isSuccess ? (
          <Table<ITestimonialItem>
            columns={columns}
            data={testimonialData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPage={testimonialData?.data?.totalPages}
            pages={{
              page: testimonialData?.data?.currentPage || page,
              pageSize: testimonialData?.data?.perPage || pageSize,
              setPage,
              setPageSize,
            }}
            totalItem={testimonialData?.data?.totalRecords}
            maxHeight="520px"
          />
        ) : isLoading ? (
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
        name="Create Testimonial"
        onOpenChange={createModal.toggle}
      >
        <CreateTestimonialModal closeModal={createModal.close} />
      </Modal>
      <Modal
        isOpen={updateModal.isOpen}
        name="Update Testimonial"
        onOpenChange={updateModal.toggle}
      >
        <UpdateTestimonialModal updateId={updateId.values} closeModal={updateModal.close} />
      </Modal>
    </div>
  );
};

export default TestimonialTable;
