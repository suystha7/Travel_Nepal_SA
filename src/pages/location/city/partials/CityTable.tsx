import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { Plus} from 'lucide-react';
import Modal from '@/components/Modal';
import type { ICityListItem } from '../interface/ICity';
import { useGetCity } from '../hooks/useGetCity';
import { useDeleteCity } from '../hooks/useDeleteCity';
import CreateCityModal from '../modal/CreateCityModal';
import { getColumns } from './CityColumns';
import UpdateCityModal from '../modal/UpdateCityModal';
import DeleteModal from '@/components/DeleteModal';
import CityFilterList from './CityFilterList';
import Header from './Header';

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
    <div className="flex flex-col flex-1 gap-6 bg-white container-shadow mt-4 px-6 py-4 rounded-[8px] overflow-y-scroll">
      <div className="flex items-center justify-between">
        <Header />

        <div className="flex justify-end gap-2 items-center">
          <CityFilterList setSearch={setSearch} search={search} />
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
          <Table<ICityListItem>
            columns={columns}
            data={cityData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPages={cityData?.data?.totalPages}
            pages={{
              page: cityData?.data?.currentPage || page,
              pageSize: cityData?.data?.perPage || pageSize,
              setPage,
              setPageSize,
            }}
            totalItems={cityData?.data?.totalRecords}
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
