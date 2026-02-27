import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { Plus } from 'lucide-react';
import Modal from '@/components/Modal';
import type { ICountryListItem } from '../interface/ICountry';
import { useGetCountry } from '../hooks/useGetCountry';
import { useDeleteCountry } from '../hooks/useDeleteCountry';
import CreateCountryModal from '../modal/CreateCountryModal';
import UpdateCountryModal from '../modal/UpdateCountryModal';
import { getColumns } from './CountryColumns';
import CountryFilterList from './CountryFilterList';
import DeleteModal from '@/components/DeleteModal';
import Header from './Header';

const CountryTable: React.FC = () => {
  const {
    countryData,
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
  } = useGetCountry();

  const {
    deleteModal,
    deleteIdState,
    handleDelete,
    isLoading: isDeleteLoading,
  } = useDeleteCountry();

  const columns = getColumns({
    countryData,
    updateId,
    updateModal,
    deleteIdState,
    deleteModal,
  });

  return (
    <div className="flex flex-col flex-1 gap-6 bg-white container-shadow mt-4 px-6 py-5 rounded-md overflow-hidden">
     <div className="flex items-center justify-between">
        <Header />

        <div className="flex justify-end gap-2 items-center">
          <CountryFilterList setSearch={setSearch} search={search} />
          <button
            onClick={createModal.open}
            className="flex items-center gap-2 px-4 py-2 cursor-pointer bg-primary-400 text-white rounded-full"
          >
            <Plus className="w-5 h-5" />
            <span className="typography-semi-bold-extra-small">Add</span>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center">
        {isSuccess ? (
          <Table<ICountryListItem>
            columns={columns}
            data={countryData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPages={countryData?.data?.totalPages}
            pages={{
              page: countryData?.data?.currentPage || page,
              pageSize: countryData?.data?.perPage || pageSize,
              setPage,
              setPageSize,
            }}
            totalItems={countryData?.data?.totalRecords}
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

      <Modal isOpen={createModal.isOpen} name="Create Country" onOpenChange={createModal.toggle}>
        <CreateCountryModal closeModal={createModal.close} />
      </Modal>
      <Modal isOpen={updateModal.isOpen} name="Update Country" onOpenChange={updateModal.toggle}>
        <UpdateCountryModal updateId={updateId.values} closeModal={updateModal.close} />
      </Modal>
    </div>
  );
};

export default CountryTable;
