import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { StatsDetailsResponse } from '../interface/IStats';
import { apiTags } from '@/constants/tag';

interface IProps {
  id: string;
}

export const useGetStatsDetails = ({ id }: IProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
  } = useGetDataQuery<{
    data: StatsDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.aboutUs.stats.details.replace(':id', id),
    tag: apiTags.aboutUs.stats.details,
  });

  return { data, isLoading, isError, isSuccess };
};
