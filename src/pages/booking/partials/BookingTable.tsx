import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { PlusCircle } from 'lucide-react';
import Modal from '@/components/Modal';
import { getColumns } from './BookingColumns';
import DeleteModal from '@/components/DeleteModal';
import { useGetBooking } from '../hooks/useGetBooking';
import { useDeleteBooking } from '../hooks/useDeleteBooking';
import type { IBookingListItem } from '../interface/IBooking';
import CreateBookingModal from '../modal/CreateBookingModal';
import UpdateBookingModal from '../modal/UpdateBookingModal';

const BookingTable: React.FC = () => {
  const {
    bookingData,
    isLoading: isGetBookingLoading,
    isSuccess: isGetBookingSuccess,
    createModal,
    updateId,
    updateModal,
    page,
    pageSize,
    setPage,
    setPageSize,
    rowSelection,
    setRowSelection,
  } = useGetBooking();

  const {
    deleteModal,
    deleteIdState,
    isLoading: isDeleteLoading,
    handleDelete,
  } = useDeleteBooking();

  const columns = getColumns({
    bookingData,
    updateId,
    updateModal,
    deleteIdState,
    deleteModal,
  });

  return (
    <div className="flex flex-col flex-1 gap-6 bg-white container-shadow mt-4 px-6 py-5 rounded-[8px] overflow-hidden">
      {/* Table Header */}
      <div className="flex justify-between items-center">
        <p className="text-primary-900 typography-semi-bold-large">Bookings</p>
        {bookingData?.data?.records?.length && (
          <button
            onClick={createModal.open}
            className="flex items-center gap-2 px-4 py-2 border-[0.6px] border-primary-500 rounded-md cursor-pointer"
          >
            <span className="text-primary-500 typography-semi-bold-extra-small">CREATE</span>
            <PlusCircle color="#0bd592" className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-hidden">
        {isGetBookingSuccess ? (
          <Table<IBookingListItem>
            columns={columns}
            data={bookingData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPage={bookingData?.data?.totalPages}
            pages={{
              page: bookingData?.data?.currentPage || page,
              pageSize: bookingData?.data?.perPage || pageSize,
              setPage: setPage,
              setPageSize: setPageSize,
            }}
            totalItem={bookingData?.data?.totalRecords}
            maxHeight="500px"
          />
        ) : isGetBookingLoading ? (
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

      <Modal isOpen={createModal.isOpen} name="Create Booking" onOpenChange={createModal.toggle}>
        <CreateBookingModal closeModal={createModal.close} />
      </Modal>

      <Modal isOpen={updateModal.isOpen} name="Update Booking" onOpenChange={updateModal.toggle}>
        <UpdateBookingModal updateId={updateId.values} closeModal={updateModal.close} />
      </Modal>
    </div>
  );
};

export default BookingTable;
