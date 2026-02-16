import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { PlusCircle } from 'lucide-react';
import Modal from '@/components/Modal';
import type { ICityListItem } from '../interface/ICity';
import { useGetCity } from '../hooks/useGetCity';
import { useDeleteCity } from '../hooks/useDeleteCity';
import CreateCityModal from '../modal/CreateCityModal';
import { getColumns } from './CityColumns';
import UpdateCityModal from '../modal/UpdateCityModal';
import DeleteModal from '@/components/DeleteModal';
import CityFilterList from './CityFilterList';

const CityTable: React.FC = () => {
  const {
    cityData,
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
  } = useGetCity();

  const { deleteModal, deleteIdState, isLoading: isDeleteLoading, handleDelete } = useDeleteCity();

  const columns = getColumns({
    cityData,
    updateId,
    updateModal,
    deleteIdState,
    deleteModal,
  });

  return (
    <div className="flex flex-col flex-1 gap-6 bg-white container-shadow mt-4 px-6 py-5 rounded-[8px] overflow-hidden">
      <div className="flex items-center justify-between h-12 gap-4">
        <CityFilterList setSearch={setSearch} search={search} />
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
          <Table<ICityListItem>
            columns={columns}
            data={cityData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPage={cityData?.data?.totalPages}
            pages={{
              page: cityData?.data?.currentPage || page,
              pageSize: cityData?.data?.perPage || pageSize,
              setPage,
              setPageSize,
            }}
            totalItem={cityData?.data?.totalRecords}
            maxHeight="400px"
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

      <Modal isOpen={createModal.isOpen} name="Create City" onOpenChange={createModal.toggle}>
        <CreateCityModal closeModal={createModal.close} />
      </Modal>
      <Modal isOpen={updateModal.isOpen} name="Update City" onOpenChange={updateModal.toggle}>
        <UpdateCityModal updateId={updateId.values} closeModal={updateModal.close} />
      </Modal>
    </div>
  );
};

export default CityTable;
