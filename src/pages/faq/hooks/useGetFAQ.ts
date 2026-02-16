import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import useStringState from '@/utils/useStringState';
import useDisclosure from '@/utils/useDisclosure';
import type { FAQListItemResponse } from '../interfaces/IFaq';
import { useState } from 'react';
import type { RowSelectionState } from '@tanstack/react-table';
import { useDebounce } from '@/utils/useDebounce';

export const useGetFAQ = () => {
  const createModal = useDisclosure();
  const updateModal = useDisclosure();
  const updateId = useStringState();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce<string>(search, 500);

  const { data, isError, isLoading, isSuccess } = useGetDataQuery<{
    data: FAQListItemResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints?.faq.list,
    params: { p: page, page_size: pageSize, search: debouncedSearch },
    tag: apiTags.faq.list,
  });

  return {
    faqData: data,
    page,
    setPage,
    pageSize,
    setPageSize,
    isError,
    isLoading,
    isSuccess,
    createModal,
    updateModal,
    updateId,
    rowSelection,
    setRowSelection,
    search,
    setSearch,
  };
};
