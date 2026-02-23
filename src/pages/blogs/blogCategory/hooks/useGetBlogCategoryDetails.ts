import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { BlogCategoryDetailsResponse } from '../interface/IBlogCategory';
import { apiTags } from '@/constants/tag';

interface IProps {
  id: string;
}

export const useGetBlogCategoryDetails = ({ id }: IProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
  } = useGetDataQuery<{
    data: BlogCategoryDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.blogs.blogCategory.details.replace(':id', id),
    tag: apiTags.blogs.blogCategory.details
  });

  return { data, isLoading, isError, isSuccess };
};
