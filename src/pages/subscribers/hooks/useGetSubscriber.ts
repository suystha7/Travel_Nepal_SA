import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import type { SubscriberListItemResponse } from '../interface/ISubscriber';
import type { RowSelectionState } from '@tanstack/react-table';
import { useState } from 'react';
import { useDebounce } from '@/utils/useDebounce';

export const useGetSubscriber = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce<string>(search, 500);

  const { data, isError, isLoading, isSuccess } = useGetDataQuery<{
    data: SubscriberListItemResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints?.subscribers.list,
    params: { p: page, page_size: pageSize, search: debouncedSearch },
    tag: apiTags.subscriber.list,
  });

  return {
    subscriberData: data,
    isError,
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
  };
};
