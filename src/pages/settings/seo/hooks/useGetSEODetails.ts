import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { StaticSEODetailsResponse } from '../interface/IStaticSEO';

interface IProps {
  id: string;
}

export const useGetSEODetails = ({ id }: IProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch: refetchSEODetails,
  } = useGetDataQuery<{
    data: StaticSEODetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.settings.seo.details.replace('id', id),
  });

  return { data, isLoading, isError, isSuccess, refetchSEODetails };
};
