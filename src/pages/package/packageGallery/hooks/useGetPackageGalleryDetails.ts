import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { PackageGalleryDetailsResponse } from '../interface/IPackageGallery';

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
    url: Endpoints.packages.packageGallery.details.replace('id', id),
  });

  return { data, isLoading, isError, isSuccess };
};
