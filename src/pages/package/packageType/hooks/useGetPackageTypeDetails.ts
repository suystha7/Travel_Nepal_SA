import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { PackageTypeDetailsResponse } from '../interface/IPackageType';
import { apiTags } from '@/constants/tag';

interface IProps {
  id: string;
}

export const useGetPackageTypeDetails = ({ id }: IProps) => {
  const { data, isLoading, isError, isSuccess } = useGetDataQuery<{
    data: PackageTypeDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.packages.packageType.details.replace(':id', id),
    tag: apiTags.packages.packageType.details
  });

  return { data, isLoading, isError, isSuccess };
};
