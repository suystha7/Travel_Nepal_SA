import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { StaticSEODetailsResponse } from '../interface/IStaticSEO';
import { apiTags } from '@/constants/tag';

interface IProps {
  id: string;
}

export const useGetSEODetails = ({ id }: IProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
  } = useGetDataQuery<{
    data: StaticSEODetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.settings.seo.details.replace(':id', id),
    tag: apiTags.settings.seo.details
  });

  return { data, isLoading, isError, isSuccess };
};
