import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { ReservationDetailsResponse } from '../interface/IReservation';

interface IProps {
  id: string;
}

export const useGetBreadcrumbDetails = ({ id }: IProps) => {
  const { data, isLoading, isError, isSuccess } = useGetDataQuery<{
    data: ReservationDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.reservation.details.replace('id', id),
  });

  return { data, isLoading, isError, isSuccess };
};
