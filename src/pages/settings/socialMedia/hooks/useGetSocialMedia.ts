import { useGetDataQuery } from '@/api/api';
import useStringState from '@/utils/useStringState';
import useDisclosure from '@/utils/useDisclosure';
import { useState } from 'react';
import type { RowSelectionState } from '@tanstack/react-table';
import type { SocialMediaSettingsListItemResponse } from '../interface/ISocialMediaSetting';

export const useGetSocialMedia = () => {
  const createModal = useDisclosure();
  const updateModal = useDisclosure();
  const updateId = useStringState();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [search, setSearch] = useState<string>('');
  // const debouncedSearch = useDebounce<string>(search, 500);

  const { data, isError, isLoading, isSuccess } = useGetDataQuery<{
    data: SocialMediaSettingsListItemResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: '/social-media',
    // tag: apiTags.packages.packageInclusion.list,
  });

  return {
    socialMediaData: data,
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
