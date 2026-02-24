import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { BlogSeoDetailsResponse } from '../interface/IBlogSeo';
import { apiTags } from '@/constants/tag';

interface IProps {
  id: string;
}

export const useGetBlogSeoDetails = ({ id }: IProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
  } = useGetDataQuery<{
    data: BlogSeoDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.blogs.blogSeo.details.replace(':id', id),
    tag: apiTags.blogs.blogSeo.details
  });

  return { data, isLoading, isError, isSuccess };
};
