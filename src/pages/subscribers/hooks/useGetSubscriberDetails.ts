import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { SubscriberDetailsResponse } from '../interface/ISubscriber';

interface IProps {
  id: string;
}

export const useSubscriberDetails = ({ id }: IProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch: refetchSubscriberDetails,
  } = useGetDataQuery<{
    data: SubscriberDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: `${Endpoints.subscribers.details}/${id}`,
  });

  return { data, isLoading, isError, isSuccess, refetchSubscriberDetails };
};
