import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import useStringState from '@/utils/useStringState';
import type { CountryListItemResponse } from '../interface/ICountry';
import useDisclosure from '@/utils/useDisclosure';
import type { RowSelectionState } from '@tanstack/react-table';
import { useState } from 'react';
import { useDebounce } from '@/utils/useDebounce';

export const useGetCountry = () => {
  const createModal = useDisclosure();
  const updateModal = useDisclosure();
  const updateId = useStringState();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce<string>(search, 500);

  const { data, isError, isLoading, isSuccess } = useGetDataQuery<{
    data: CountryListItemResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints?.location?.country?.list,
    params: { p: page, page_size: pageSize, search: debouncedSearch },
    tag: apiTags.location.country.list,
  });

  return {
    countryData: data,
    isError,
    isLoading,
    isSuccess,
    createModal,
    updateModal,
    updateId,
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
