import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import Modal from '@/components/Modal';
import { useGetReview } from '../hooks/useGetReview';
import { getColumns } from './ReviewColumns';
import { useDeleteReview } from '../hooks/useDeleteReview';
import DeleteModal from '@/components/DeleteModal';
import type { IReviewItem } from '../interface/IReview';
import ReviewFilterList from './ReviewFilterList';
import ViewReviewModal from '../modal/ViewReviewModal';

const ReviewTable: React.FC = () => {
  const {
    reviewData,
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
  } = useGetReview();

  const {
    deleteModal,
    deleteIdState,
    isLoading: isDeleteLoading,
    handleDelete,
  } = useDeleteReview();

  const columns = getColumns({
    reviewData,
    viewId,
    viewModal,
    deleteIdState,
    deleteModal,
  });

  return (
    <div className="flex flex-col flex-1 gap-6 bg-white container-shadow mt-4 px-6 py-5 rounded-[8px] overflow-hidden">
      <div className="flex items-center justify-between h-12 gap-4">
        <ReviewFilterList setSearch={setSearch} search={search} />
      </div>

      <div className="flex-1 overflow-hidden">
        {isSuccess ? (
          <Table<IReviewItem>
            columns={columns}
            data={reviewData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPage={reviewData?.data?.totalPages}
            pages={{
              page: reviewData?.data?.currentPage || page,
              pageSize: reviewData?.data?.perPage || pageSize,
              setPage,
              setPageSize,
            }}
            totalItem={reviewData?.data?.totalRecords}
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

      <Modal isOpen={viewModal.isOpen} name="View Review" onOpenChange={viewModal.toggle}>
        <ViewReviewModal viewId={viewId.values} closeModal={viewModal.close} />
      </Modal>
    </div>
  );
};

export default ReviewTable;
