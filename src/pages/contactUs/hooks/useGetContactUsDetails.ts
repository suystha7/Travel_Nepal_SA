import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { ContactUsDetailsResponse } from '../interface/IContactUs';

interface IProps {
  id: string;
}

export const useGetContactUsDetails = ({ id }: IProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch: refetchContactusDetails,
  } = useGetDataQuery<{
    data: ContactUsDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.contactUs.details.replace('id', id),
  });

  return { data, isLoading, isError, isSuccess, refetchContactusDetails };
};
