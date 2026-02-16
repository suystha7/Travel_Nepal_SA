import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { BlogDetailsResponse } from '../interface/IBlog';

interface IProps {
  id: string;
}

export const useGetBlogDetails = ({ id }: IProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch: refetchBlogDetails,
  } = useGetDataQuery<{
    data: BlogDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.blogs.blog.details.replace('id', id),
  });

  return { data, isLoading, isError, isSuccess, refetchBlogDetails };
};
