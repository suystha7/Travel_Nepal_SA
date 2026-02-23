import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { BookingDetailsResponse } from '../interface/IBooking';
import { apiTags } from '@/constants/tag';

interface IProps {
  id: string;
}

export const useGetBookingDetails = ({ id }: IProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
  } = useGetDataQuery<{
    data: BookingDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.booking.details.replace(':id', id),
    tag: apiTags.booking.details
  });

  return { data, isLoading, isError, isSuccess };
};
