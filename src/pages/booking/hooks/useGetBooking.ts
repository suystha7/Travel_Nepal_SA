import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import useStringState from '@/utils/useStringState';
import type { BookingListItemResponse } from '../interface/IBooking';
import useDisclosure from '@/utils/useDisclosure';
import { useState } from 'react';
import type { RowSelectionState } from '@tanstack/react-table';

export const useGetBooking = () => {
  const createModal = useDisclosure();
  const updateModal = useDisclosure();
  const updateId = useStringState();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const { data, isError, isLoading, isSuccess } = useGetDataQuery<{
    data: BookingListItemResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.booking.list,
    tag: apiTags.booking.list,
  });

  return {
    bookingData: data,
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
