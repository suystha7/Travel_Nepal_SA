import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { PolicyDetailsResponse } from '../interface/IPolicy';
import { apiTags } from '@/constants/tag';

interface IProps {
  id: string;
}

export const useGetPolicyDetails = ({ id }: IProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
  } = useGetDataQuery<{
    data: PolicyDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.settings.policy.details.replace(':id', id),
    tag: apiTags.settings.policy.details
  });

  return { data, isLoading, isError, isSuccess };
};
