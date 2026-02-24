import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import useStringState from '@/utils/useStringState';
import type { ReviewListItemResponse } from '../interface/IReview';
import useDisclosure from '@/utils/useDisclosure';
import type { RowSelectionState } from '@tanstack/react-table';
import { useState } from 'react';

export const useGetReview = () => {
  const createModal = useDisclosure();
  const viewModal = useDisclosure();
  const viewId = useStringState();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [search, setSearch] = useState('');

  const { data, isError, isLoading, isSuccess } = useGetDataQuery<{
    data: ReviewListItemResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints?.reviews.list,
    params: { p: page, page_size: pageSize, search },
    tag: apiTags.reviews.list,
  });

  return {
    reviewData: data,
    isError,
    isLoading,
    isSuccess,
    createModal,
    viewModal,
    viewId,
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
