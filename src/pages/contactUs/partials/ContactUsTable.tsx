import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { useGetContactUs } from '../hooks/useGetContactUs';
import type { IContactUsListItem } from '../interface/IContactUs';
import { getColumns } from './ContactUsColumns';
import ContactFilterList from './ContactFilterList';
import Modal from '@/components/Modal';
import ViewContactModal from '../modal/ViewContactModal';
import Header from './Header';

const ContactUsTable: React.FC = () => {
  const {
    contactUsData,
    isLoading: isGetContactUsLoading,
    isSuccess: isGetContactUsSuccess,
    page,
    pageSize,
    setPage,
    setPageSize,
    rowSelection,
    setRowSelection,
    search,
    viewModal,
    viewId,
    setSearch,
  } = useGetContactUs();

  const column = getColumns({
    contactUsData,
    viewId,
    viewModal,
  });

  return (
    <div className="flex flex-col flex-1 gap-6 bg-white container-shadow px-6 py-4 rounded-[8px] overflow-y-scroll">
      <div className="flex items-center justify-between">
        <Header />

        <div className="flex justify-end gap-2 items-center">
          <ContactFilterList setSearch={setSearch} search={search} />
        </div>
      </div>

      <div className="flex">
        {isGetContactUsSuccess ? (
          <Table<IContactUsListItem>
            columns={column}
            data={contactUsData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPages={contactUsData?.data?.totalPages}
            pages={{
              page: contactUsData?.data?.currentPage || page,
              pageSize: contactUsData?.data?.perPage || pageSize,
              setPage: setPage,
              setPageSize: setPageSize,
            }}
            totalItems={contactUsData?.data?.totalRecords}
          />
        ) : isGetContactUsLoading ? (
          <LoadingScreen />
        ) : (
          <ErrorMessage />
        )}
      </div>

      <Modal isOpen={viewModal.isOpen} name="View Contact Info" onOpenChange={viewModal.toggle}>
        <ViewContactModal viewId={viewId.values} closeModal={viewModal.close} />
      </Modal>
    </div>
  );
};

export default ContactUsTable;
