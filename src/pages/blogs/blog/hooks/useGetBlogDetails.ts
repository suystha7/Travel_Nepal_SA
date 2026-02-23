import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { BlogDetailsResponse } from '../interface/IBlog';
import { apiTags } from '@/constants/tag';

interface IProps {
  id: string;
}

export const useGetBlogDetails = ({ id }: IProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
  } = useGetDataQuery<{
    data: BlogDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.blogs.blog.details.replace(':id', id),
    tag: apiTags.blogs.blog.details
  });

  return { data, isLoading, isError, isSuccess };
};
