import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { BlogCategoryDetailsResponse } from '../interface/IBlogCategory';

interface IProps {
  id: string;
}

export const useGetBlogCategoryDetails = ({ id }: IProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch: refetchBlogCategoryDetails,
  } = useGetDataQuery<{
    data: BlogCategoryDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.blogs.blogCategory.details.replace('id', id),
  });

  return { data, isLoading, isError, isSuccess, refetchBlogCategoryDetails };
};
