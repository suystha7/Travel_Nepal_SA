import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { PackageImageSeoDetailsResponse } from '../interface/IPackageImageSeo';
import { apiTags } from '@/constants/tag';

interface IProps {
  id: string;
}

export const useGetPackageImageSeoDetails = ({ id }: IProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
  } = useGetDataQuery<{
    data: PackageImageSeoDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.packages.packageImageSeo.details.replace(':id', id),
    tag: apiTags.packages.packageImageSeo.details
  });

  return { data, isLoading, isError, isSuccess };
};
