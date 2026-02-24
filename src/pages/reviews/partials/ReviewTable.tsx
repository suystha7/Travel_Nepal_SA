import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import Modal from '@/components/Modal';
import { useGetReview } from '../hooks/useGetReview';
import { getColumns } from './ReviewColumns';
import type { IReviewItem } from '../interface/IReview';
import ReviewFilterList from './ReviewFilterList';
import ViewReviewModal from '../modal/ViewReviewModal';
import ApproveModal from '../modal/ApproveReviewModal';
import { useApproveReview } from '../hooks/useApproveReview';

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
    approveModal,
    approveId,
  } = useGetReview();

  const { isLoading: isApproveLoading, handleApprove } = useApproveReview({
    closeModal: approveModal.close,
    approveId: approveId.values,
  });

  const columns = getColumns({
    reviewData,
    viewId,
    viewModal,
    approveId,
    approveModal,
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

      {approveModal?.isOpen && approveId?.values && (
        <ApproveModal
          isOpen={approveModal.isOpen}
          onClose={approveModal.close}
          onApprove={handleApprove}
          isLoading={isApproveLoading}
          primaryMessage="Confirm Approval"
          secondaryMessage="Are you sure you want to approve this review?"
          primaryButton="Approve"
          secondaryButton="Cancel"
        />
      )}

      <Modal isOpen={viewModal.isOpen} name="View Review" onOpenChange={viewModal.toggle}>
        <ViewReviewModal viewId={viewId.values} closeModal={viewModal.close} />
      </Modal>
    </div>
  );
};

export default ReviewTable;
