import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { ReviewDetailsResponse } from '../interface/IReview';
import { apiTags } from '@/constants/tag';

interface IProps {
  id: string;
}

export const useGetReviewDetails = ({ id }: IProps) => {
  const { data, isLoading, isError, isSuccess } = useGetDataQuery<{
    data: ReviewDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.reviews.details.replace(':id', id),
    tag: apiTags.reviews.details,
  });

  return { data, isLoading, isError, isSuccess };
};
