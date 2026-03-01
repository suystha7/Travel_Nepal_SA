import { useGetDataQuery } from '@/api/api';
import { apiTags } from '@/constants/tag';
import useStringState from '@/utils/useStringState';
import type { ProfileDetailsResponse } from '../interface/IProfile';
import useDisclosure from '@/utils/useDisclosure';
import { useState } from 'react';
import type { RowSelectionState } from '@tanstack/react-table';
import { useDebounce } from '@/utils/useDebounce';
import { Endpoints } from '@/api/endpoints';

export const useGetProfile = () => {
  const createModal = useDisclosure();
  const updateModal = useDisclosure();
  const updateId = useStringState();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce<string>(search, 500);

  const { data, isError, isLoading, isSuccess } = useGetDataQuery<{
    data: ProfileDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints?.auth?.profile?.get,
    params: {p: page, page_size: pageSize, search: debouncedSearch },
    tag: apiTags.auth.profile.list,
  }); 

  console.log("data", data)
  
  return {
    profileData: data,
    isError,
    isLoading,
    isSuccess,
    createModal,
    updateModal,
    updateId,
    page,
    setPage,
    pageSize,
    setPageSize,
    rowSelection,
    setRowSelection,
    search,
    setSearch,
  };
};
