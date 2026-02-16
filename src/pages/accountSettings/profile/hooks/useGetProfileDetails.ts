import { useGetDataQuery } from '@/api/api';
import type { ProfileDetailsResponse } from '../interface/IProfile';

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
    url: '/user/profile/' + id,
  });

  return { data, isLoading, isError, isSuccess };
};
