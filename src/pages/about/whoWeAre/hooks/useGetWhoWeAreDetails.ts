import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { WhoWeAreDetailsResponse } from '../interface/IWhoWeAre';
import { apiTags } from '@/constants/tag';

interface IProps {
  id: string;
}

export const useGetWhoWeAreDetails = ({ id }: IProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
  } = useGetDataQuery<{
    data: WhoWeAreDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.aboutUs.whoWeAre.details.replace(':id', id),
    tag: apiTags.aboutUs.whoWeAre.details
  });

  return { data, isLoading, isError, isSuccess };
};
