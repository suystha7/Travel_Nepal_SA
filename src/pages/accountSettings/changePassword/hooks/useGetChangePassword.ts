import { useGetDataQuery } from '@/api/api';
// import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import useStringState from '@/utils/useStringState';
import type { ProfileDetailsResponse } from '../interface/IChangePassword';
import useDisclosure from '@/utils/useDisclosure';
import { useState } from 'react';
import type { RowSelectionState } from '@tanstack/react-table';
import { useDebounce } from '@/utils/useDebounce';
import { getCookie } from '@/utils/cookie';

export const useGetChangePassword = () => {
  const createModal = useDisclosure();
  const updateModal = useDisclosure();
  const updateId = useStringState();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce<string>(search, 500);

  const id = getCookie('user_id') || '';

  const { data, isError, isLoading, isSuccess } = useGetDataQuery<{
    data: ProfileDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: `/user/profile/${id}`,
    params: { p: page, page_size: pageSize, search: debouncedSearch },
    tag: apiTags.auth.profile.list,
  });

  return {
    changePasswordData: data,
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
