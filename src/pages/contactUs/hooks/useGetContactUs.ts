import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import type { ContactUsListItemResponse } from '../interface/IContactUs';
import { useState } from 'react';
import type { RowSelectionState } from '@tanstack/react-table';
import { useDebounce } from '@/utils/useDebounce';

export const useGetContactUs = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce<string>(search, 500);

  const { data, isError, isLoading, isSuccess } = useGetDataQuery<{
    data: ContactUsListItemResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints?.contactUs.list,
    params: { p: page, page_size: pageSize, search: debouncedSearch },
    tag: apiTags.contactUs.list,
  });

  return {
    contactUsData: data,
    page,
    pageSize,
    setPage,
    setPageSize,
    isError,
    isLoading,
    isSuccess,
    rowSelection,
    setRowSelection,
    search,
    setSearch,
  };
};
