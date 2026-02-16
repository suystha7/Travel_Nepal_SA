import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { StatsDetailsResponse } from '../interface/IStats';

interface IProps {
  id: string;
}

export const useGetStatsDetails = ({ id }: IProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch: refetchStatsDetails,
  } = useGetDataQuery<{
    data: StatsDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.aboutUs.stats.details.replace('id', id),
  });

  return { data, isLoading, isError, isSuccess, refetchStatsDetails };
};
