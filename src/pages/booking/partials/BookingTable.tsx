import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { Plus } from 'lucide-react';
import Modal from '@/components/Modal';
import { getColumns } from './BookingColumns';
import DeleteModal from '@/components/DeleteModal';
import { useGetBooking } from '../hooks/useGetBooking';
import { useDeleteBooking } from '../hooks/useDeleteBooking';
import type { IBookingListItem } from '../interface/IBooking';
import CreateBookingModal from '../modal/CreateBookingModal';
import UpdateBookingModal from '../modal/UpdateBookingModal';
import Header from './Header';
import BookingFilterList from './BookingFilterList';

const BookingTable: React.FC = () => {
  const {
    bookingData,
    isLoading: isGetBookingLoading,
    isSuccess: isGetBookingSuccess,
    createModal,
    updateId,
    updateModal,
    search,
    setSearch,
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
    <div className="flex flex-col flex-1 gap-6 bg-white container-shadow px-6 py-4 rounded-[8px] overflow-y-scroll">
      <div className="flex items-center justify-between">
        <Header />

        <div className="flex justify-end gap-2 items-center">
          <BookingFilterList setSearch={setSearch} search={search} />
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
        {isGetBookingSuccess ? (
          <Table<IBookingListItem>
            columns={columns}
            data={bookingData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPages={bookingData?.data?.totalPages}
            pages={{
              page: bookingData?.data?.currentPage || page,
              pageSize: bookingData?.data?.perPage || pageSize,
              setPage: setPage,
              setPageSize: setPageSize,
            }}
            totalItems={bookingData?.data?.totalRecords}
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
