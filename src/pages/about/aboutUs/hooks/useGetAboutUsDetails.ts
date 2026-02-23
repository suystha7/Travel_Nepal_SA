import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { AboutUsDetailsResponse } from '../interface/IAboutUs';
import { apiTags } from '@/constants/tag';

interface IProps {
  id: string;
}

export const useGetAboutUsDetails = ({ id }: IProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
  } = useGetDataQuery<{
    data: AboutUsDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.aboutUs.about.details.replace(':id', id),
    tag: apiTags.aboutUs.about.details,
  });

  return { data, isLoading, isError, isSuccess };
};
