import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { FAQDetailsResponse } from '../interfaces/IFaq';

interface IProps {
  id: string;
}

export const useGetFAQDetails = ({ id }: IProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch: refetchFAQDetails,
  } = useGetDataQuery<{
    data: FAQDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.faq.details.replace('id', id),
  });

  return { data, isLoading, isError, isSuccess, refetchFAQDetails };
};
