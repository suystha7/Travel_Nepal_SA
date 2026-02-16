import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { WhoWeAreDetailsResponse } from '../interface/IWhoWeAre';

interface IProps {
  id: string;
}

export const useGetWhoWeAreDetails = ({ id }: IProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch: refetchWhoWeAreDetails,
  } = useGetDataQuery<{
    data: WhoWeAreDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.aboutUs.whoWeAre.details.replace('id', id),
  });

  return { data, isLoading, isError, isSuccess, refetchWhoWeAreDetails };
};
