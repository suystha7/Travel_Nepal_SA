import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { PackageSeoDetailsResponse } from '../interface/IPackageSeo';
import { apiTags } from '@/constants/tag';

interface IProps {
  id: string;
}

export const useGetPackageSeoDetails = ({ id }: IProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
  } = useGetDataQuery<{
    data: PackageSeoDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.packages.packageSeo.details.replace(':id', id),
    tag: apiTags.packages.packageSeo.details
  });

  return { data, isLoading, isError, isSuccess };
};
