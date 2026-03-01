import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { Plus } from 'lucide-react';
import Modal from '@/components/Modal';
import { useGetTestimonial } from '../hooks/useGetTestimonial';
import { getColumns } from './TestimonialColumns';
import CreateTestimonialModal from '../modal/CreateTestimonialModal';
import UpdateTestimonialModal from '../modal/UpdateTestimonialModal';
import { useDeleteTestimonial } from '../hooks/useDeleteTestimonial';
import DeleteModal from '@/components/DeleteModal';
import TestimonialFilterList from './TestimonialFilterList';
import type { ITestimonialItem } from '../interface/ITestimonial';
import Header from './Header';

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
    <div className="flex flex-col flex-1 bg-white container-shadow gap-6 mt-4 px-4 py-5 rounded-md-[8px] overflow-y-scroll">
      <div className="flex items-center justify-between">
        <Header />

        <div className="flex justify-end gap-2 items-center">
          <TestimonialFilterList setSearch={setSearch} search={search} />
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
        {isSuccess ? (
          <Table<ITestimonialItem>
            columns={columns}
            data={testimonialData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPages={testimonialData?.data?.totalPages}
            pages={{
              page: testimonialData?.data?.currentPage || page,
              pageSize: testimonialData?.data?.perPage || pageSize,
              setPage,
              setPageSize,
            }}
            totalItems={testimonialData?.data?.totalRecords}
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
