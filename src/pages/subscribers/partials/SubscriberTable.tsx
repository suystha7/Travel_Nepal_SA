import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import type { ISubscriberListItem } from '../interface/ISubscriber';
import { useGetSubscriber } from '../hooks/useGetSubscriber';
import { getColumns } from './SubscriberColumns';
import SubscriberFilterList from './SubscriberFilterList';

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
    <div className="flex flex-col flex-1 gap-6 bg-white container-shadow mt-4 px-6 py-5 rounded-[8px] overflow-hidden">
      <div className="flex items-center justify-between h-12 gap-4">
        <SubscriberFilterList setSearch={setSearch} search={search} />
      </div>

      <div className="flex-1 overflow-hidden">
        {isSuccess ? (
          <Table<ISubscriberListItem>
            columns={columns}
            data={subscriberData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPage={subscriberData?.data?.totalPages}
            pages={{
              page: subscriberData?.data?.currentPage || page,
              pageSize: subscriberData?.data?.perPage || pageSize,
              setPage,
              setPageSize,
            }}
            totalItem={subscriberData?.data?.totalRecords}
            maxHeight="500px"
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
