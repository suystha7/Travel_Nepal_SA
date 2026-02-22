import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { WhyUsDetailsResponse } from '../interface/IWhyUs';

interface IProps {
  id: string;
}

export const useGetWhuUsDetails = ({ id }: IProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch: refetchWhyUsDetails,
  } = useGetDataQuery<{
    data: WhyUsDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.aboutUs.whyUs.details.replace('id', id),
  });

  return { data, isLoading, isError, isSuccess, refetchWhyUsDetails };
};
