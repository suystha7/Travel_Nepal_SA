import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { TestimonialDetailsResponse } from '../interface/ITestimonial';
import { apiTags } from '@/constants/tag';

interface IProps {
  id: string;
}

export const useGetTestimonialDetails = ({ id }: IProps) => {
  const { data, isLoading, isError, isSuccess } = useGetDataQuery<{
    data: TestimonialDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.testimonial.details.replace(':id', id),
    tag: apiTags.testimonial.details
  });

  return { data, isLoading, isError, isSuccess };
};
