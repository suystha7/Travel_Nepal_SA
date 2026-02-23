import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { UserDetailsResponse } from '../interface/IUser';
import { apiTags } from '@/constants/tag';

interface IProps {
  id: string;
}

export const useGetUserDetails = ({ id }: IProps) => {
  const { data, isLoading, isError, isSuccess } = useGetDataQuery<{
    data: UserDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.user.details.replace(':id', id),
    tag: apiTags.user.details
  });

  return { data, isLoading, isError, isSuccess };
};
