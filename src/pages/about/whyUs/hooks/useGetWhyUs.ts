import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import useStringState from '@/utils/useStringState';
import useDisclosure from '@/utils/useDisclosure';
import { useState } from 'react';
import type { RowSelectionState } from '@tanstack/react-table';
import type { WhyUsDetailsResponse } from '../interface/IWhyUs';

export const useGetWhyUs = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const createModal = useDisclosure();
  const updateModal = useDisclosure();
  const updateId = useStringState();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const { data, isError, isLoading, isSuccess } = useGetDataQuery<{
    data: WhyUsDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints?.aboutUs.whyUs.list,
    params: { p: page, page_size: pageSize },
    tag: apiTags.aboutUs.whyUs.list,
  });

  return {
    whyUsData: data,
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
  };
};
