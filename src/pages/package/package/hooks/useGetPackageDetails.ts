import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { PackageFormDetailsResponse } from '../interface/IPackage';

interface IProps {
  id: string;
}

export const useGetPackageDetails = ({ id }: IProps) => {
  const { data, isLoading, isError, isSuccess } = useGetDataQuery<{
    data: PackageFormDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.packages.package.details.replace('id', id),
  });

  return { data, isLoading, isError, isSuccess };
};
