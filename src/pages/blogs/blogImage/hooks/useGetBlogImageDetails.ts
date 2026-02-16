import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { BlogImageDetailsResponse } from '../interface/IBlogImage';

interface IProps {
  id: string;
}

export const useGetBlogImageDetails = ({ id }: IProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch: refetchBlogImageDetails,
  } = useGetDataQuery<{
    data: BlogImageDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.blogs.blogImage.details.replace('id', id),
  });

  return { data, isLoading, isError, isSuccess, refetchBlogImageDetails };
};
