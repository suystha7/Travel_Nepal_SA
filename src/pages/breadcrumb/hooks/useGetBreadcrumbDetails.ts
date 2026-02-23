import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { BreadcrumbDetailsResponse } from '../interface/IBreadcrumb';
import { apiTags } from '@/constants/tag';

interface IProps {
  id: string;
}

export const useGetBreadcrumbDetails = ({ id }: IProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
  } = useGetDataQuery<{
    data: BreadcrumbDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.breadcrumb.details.replace(':id', id),
    tag: apiTags.breadcrumb.details
  });

  return { data, isLoading, isError, isSuccess };
};
