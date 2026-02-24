import { useGetDataQuery } from '@/api/api';
import type { ProfileDetailsResponse } from '../interface/IProfile';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';

interface IProps {
  id: string;
}

export const useGetProfileDetails = ({ id }: IProps) => {
  const { data, isLoading, isError, isSuccess } = useGetDataQuery<{
    data: ProfileDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.auth.profile.details.replace(':id', id),
    tag: apiTags.auth.profile.details,
  });

  return { data, isLoading, isError, isSuccess };
};
