import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { SubscriberDetailsResponse } from '../interface/ISubscriber';
import { apiTags } from '@/constants/tag';

interface IProps {
  id: string;
}

export const useSubscriberDetails = ({ id }: IProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
  } = useGetDataQuery<{
    data: SubscriberDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.subscribers.details.replace(':id', id),
    tag: apiTags.subscriber.details,
  });

  return { data, isLoading, isError, isSuccess };
};
