import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { AboutUsDetailsResponse } from '../interface/IAboutUs';

interface IProps {
  id: string;
}

export const useGetAboutUsDetails = ({ id }: IProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch: refetchAboutUsDetails,
  } = useGetDataQuery<{
    data: AboutUsDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.aboutUs.about.details.replace('id', id),
  });

  return { data, isLoading, isError, isSuccess, refetchAboutUsDetails };
};
