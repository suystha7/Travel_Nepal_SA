import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { BookingDetailsResponse } from '../interface/IBooking';

interface IProps {
  id: string;
}

export const useGetBookingDetails = ({ id }: IProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch: refetchBookingDetails,
  } = useGetDataQuery<{
    data: BookingDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.booking.details.replace('id', id),
  });

  return { data, isLoading, isError, isSuccess, refetchBookingDetails };
};
