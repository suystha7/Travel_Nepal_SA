import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import type { ISubscriberListItem } from '../interface/ISubscriber';
import { useGetSubscriber } from '../hooks/useGetSubscriber';
import { getColumns } from './SubscriberColumns';
import SubscriberFilterList from './SubscriberFilterList';
import Header from './Header';

const SubscriberTable: React.FC = () => {
  const {
    subscriberData,
    isLoading,
    isSuccess,
    page,
    pageSize,
    setPage,
    setPageSize,
    rowSelection,
    setRowSelection,
    search,
    setSearch,
  } = useGetSubscriber();

  const columns = getColumns({
    subscriberData,
  });

  return (
    <div className="flex flex-col flex-1 gap-6 bg-white container-shadow px-6 py-4 rounded-[8px] overflow-y-scroll">
      <div className="flex items-center justify-between">
        <Header />

        <div className="flex justify-end gap-2 items-center">
          <SubscriberFilterList setSearch={setSearch} search={search} />
        </div>
      </div>

      <div className="flex">
        {isSuccess ? (
          <Table<ISubscriberListItem>
            columns={columns}
            data={subscriberData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPages={subscriberData?.data?.totalPages}
            pages={{
              page: subscriberData?.data?.currentPage || page,
              pageSize: subscriberData?.data?.perPage || pageSize,
              setPage,
              setPageSize,
            }}
            totalItems={subscriberData?.data?.totalRecords}
          />
        ) : isLoading ? (
          <LoadingScreen />
        ) : (
          <ErrorMessage />
        )}
      </div>
    </div>
  );
};

export default SubscriberTable;
