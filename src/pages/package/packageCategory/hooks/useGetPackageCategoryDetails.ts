import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { PackageCategoryDetailsResponse } from '../interface/IPackageCategory';

interface IProps {
  id: string;
}

export const useGetPackageCategoryDetails = ({ id }: IProps) => {
  const { data, isLoading, isError, isSuccess } = useGetDataQuery<{
    data: PackageCategoryDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.packages.packageCategory.details.replace('id', id),
  });

  return { data, isLoading, isError, isSuccess };
};
