import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import Modal from '@/components/Modal';
import { useGetTestimonial } from '../hooks/useGetTestimonial';
import { getColumns } from './TestimonialColumns';
import { useDeleteTestimonial } from '../hooks/useDeleteTestimonial';
import DeleteModal from '@/components/DeleteModal';
import TestimonialFilterList from './TestimonialFilterList';
import type { ITestimonialItem } from '../interface/ITestimonial';
import ViewTestimonialModal from '../modal/ViewTestimonialModal';

const TestimonialTable: React.FC = () => {
  const {
    testimonialData,
    isLoading,
    isSuccess,
    viewModal,
    viewId,
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
    viewId,
    viewModal,
    deleteIdState,
    deleteModal,
  });

  return (
    <div className="flex flex-col flex-1 gap-6 bg-white container-shadow mt-4 px-6 py-5 rounded-[8px] overflow-hidden">
      <div className="flex items-center justify-between h-12 gap-4">
        <TestimonialFilterList setSearch={setSearch} search={search} />
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

      <Modal isOpen={viewModal.isOpen} name="View Testimonial" onOpenChange={viewModal.toggle}>
        <ViewTestimonialModal viewId={viewId.values} closeModal={viewModal.close} />
      </Modal>
    </div>
  );
};

export default TestimonialTable;
