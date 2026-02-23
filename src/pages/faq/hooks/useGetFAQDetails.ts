import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { FAQDetailsResponse } from '../interfaces/IFaq';
import { apiTags } from '@/constants/tag';

interface IProps {
  id: string;
}

export const useGetFAQDetails = ({ id }: IProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
  } = useGetDataQuery<{
    data: FAQDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.faq.details.replace(':id', id),
    tag: apiTags.faq.details
  });

  return { data, isLoading, isError, isSuccess };
};
