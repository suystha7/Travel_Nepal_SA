import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { ContactUsDetailsResponse } from '../interface/IContactUs';
import { apiTags } from '@/constants/tag';

interface IProps {
  id: string;
}

export const useGetContactUsDetails = ({ id }: IProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
  } = useGetDataQuery<{
    data: ContactUsDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.contactUs.details.replace(':id', id),
    tag: apiTags.contactUs.details
  });

  return { data, isLoading, isError, isSuccess };
};
