import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { BlogImageSeoDetailsResponse } from '../interface/IBlogImageSeo';
import { apiTags } from '@/constants/tag';

interface IProps {
  id: string;
}

export const useGetBlogImageSeoDetails = ({ id }: IProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
  } = useGetDataQuery<{
    data: BlogImageSeoDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.blogs.blogImageSeo.details.replace(':id', id),
    tag: apiTags.blogs.blogImageSeo.details
  });

  return { data, isLoading, isError, isSuccess };
};
