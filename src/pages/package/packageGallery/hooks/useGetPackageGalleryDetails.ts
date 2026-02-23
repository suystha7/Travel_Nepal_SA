import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { PackageGalleryDetailsResponse } from '../interface/IPackageGallery';
import { apiTags } from '@/constants/tag';

interface IProps {
  id: string;
}

export const useGetPackageGalleryDetails = ({ id }: IProps) => {
  const { data, isLoading, isError, isSuccess } = useGetDataQuery<{
    data: PackageGalleryDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.packages.packageGallery.details.replace(':id', id),
    tag: apiTags.packages.packageGallery.details
  });

  return { data, isLoading, isError, isSuccess };
};
