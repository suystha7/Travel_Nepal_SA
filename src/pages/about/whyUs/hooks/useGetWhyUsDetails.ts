import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { WhyUsDetailsResponse } from '../interface/IWhyUs';
import { apiTags } from '@/constants/tag';

interface IProps {
  id: string;
}

export const useGetWhuUsDetails = ({ id }: IProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
  } = useGetDataQuery<{
    data: WhyUsDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.aboutUs.whyUs.details.replace(':id', id),
    tag: apiTags.aboutUs.whyUs.details,
  });

  return { data, isLoading, isError, isSuccess };
};
