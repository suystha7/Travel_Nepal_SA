import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { PackageVideoDetailsResponse } from '../interface/IPackageVideo';
import { apiTags } from '@/constants/tag';

interface IProps {
  id: string;
}

export const useGetPackageVideoDetails = ({ id }: IProps) => {
  const { data, isLoading, isError, isSuccess } = useGetDataQuery<{
    data: PackageVideoDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.packages.packageVideo.details.replace(':id', id),
    tag: apiTags.packages.packageVideo.details
  });

  return { data, isLoading, isError, isSuccess };
};
