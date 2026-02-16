import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { PlusCircle } from 'lucide-react';
import Modal from '@/components/Modal';
import type { IReservationListItem } from '../interface/IReservation';
import { useGetReservation } from '../hooks/useGetReseravation';
import { useDeleteReservation } from '../hooks/useDeleteReservation';
import CreateReservationModal from '../modal/CreateReservationModal';
import UpdateReservationModal from '../modal/UpdateReseravtionModal';
import { getColumns } from './ReservationColumns';
import DeleteModal from '@/components/DeleteModal';
import ReservationFilterList from './ReservationFilterList';

const ReservationTable: React.FC = () => {
  const {
    reservationData,
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
  } = useGetReservation();

  const {
    deleteModal,
    deleteIdState,
    isLoading: isDeleteLoading,
    handleDelete,
  } = useDeleteReservation();

  const columns = getColumns({
    reservationData,
    updateId,
    updateModal,
    deleteIdState,
    deleteModal,
  });

  return (
    <div className="flex flex-col flex-1 gap-6 bg-white container-shadow mt-4 px-6 py-5 rounded-[8px] overflow-hidden">
      <div className="flex items-center justify-between h-12 gap-4">
        <ReservationFilterList setSearch={setSearch} search={search} />
        <button
          onClick={createModal.open}
          className="flex items-center gap-2 px-4 py-3 border border-primary-500 rounded-md cursor-pointer"
        >
          <span className="text-primary-500 typography-semi-bold-extra-small">CREATE</span>
          <PlusCircle className="w-5 h-5 text-primary-500" />
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        {isSuccess ? (
          <Table<IReservationListItem>
            columns={columns}
            data={reservationData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPage={reservationData?.data?.totalPages}
            pages={{
              page: reservationData?.data?.currentPage || page,
              pageSize: reservationData?.data?.perPage || pageSize,
              setPage,
              setPageSize,
            }}
            totalItem={reservationData?.data?.totalRecords}
            maxHeight="500px"
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
        name="Create Reservation"
        onOpenChange={createModal.toggle}
      >
        <CreateReservationModal closeModal={createModal.close} />
      </Modal>
      <Modal
        isOpen={updateModal.isOpen}
        name="Update Reservation"
        onOpenChange={updateModal.toggle}
      >
        <UpdateReservationModal updateId={updateId.values} closeModal={updateModal.close} />
      </Modal>
    </div>
  );
};

export default ReservationTable;
