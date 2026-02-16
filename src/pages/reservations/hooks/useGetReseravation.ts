import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import useStringState from '@/utils/useStringState';
import type { ReservationListItemResponse } from '../interface/IReservation';
import useDisclosure from '@/utils/useDisclosure';
import type { RowSelectionState } from '@tanstack/react-table';
import { useState } from 'react';
import { useDebounce } from '@/utils/useDebounce';

export const useGetReservation = () => {
  const createModal = useDisclosure();
  const updateModal = useDisclosure();
  const viewModal = useDisclosure();
  const updateId = useStringState();
  const viewId = useStringState();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce<string>(search, 500);

  const { data, isError, isLoading, isSuccess } = useGetDataQuery<{
    data: ReservationListItemResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints?.reservation.list,
    params: { p: page, page_size: pageSize, search: debouncedSearch },
    tag: apiTags.reservation.list,
  });

  return {
    reservationData: data,
    isError,
    isLoading,
    isSuccess,
    createModal,
    updateModal,
    updateId,
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
