import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { PolicyDetailsResponse } from '../interface/IPolicy';

interface IProps {
  id: string;
}

export const useGetPolicyDetails = ({ id }: IProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch: refetchPolicyDetails,
  } = useGetDataQuery<{
    data: PolicyDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.settings.policy.details.replace('id', id),
  });

  return { data, isLoading, isError, isSuccess, refetchPolicyDetails };
};
